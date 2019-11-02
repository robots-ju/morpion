from random import choice
from socket import socket
def check_win(board, player1, player2):
    """
    returns status of current board: 1-> won, 2-> draw, 0-> game undecided
    if game won, return value is [1,who_won]
    """
    returned_val = ['', '']
    if   board[0] == board[1] == board[2] and board[0] in [player1, player2]:    returned_val = [1, board[0]]
    elif board[3] == board[4] == board[5] and board[3] in [player1, player2]:    returned_val = [1, board[3]]
    elif board[6] == board[7] == board[8] and board[6] in [player1, player2]:    returned_val = [1, board[6]]
    elif board[0] == board[3] == board[6] and board[0] in [player1, player2]:    returned_val = [1, board[0]]
    elif board[1] == board[4] == board[7] and board[1] in [player1, player2]:    returned_val = [1, board[1]]
    elif board[2] == board[5] == board[8] and board[2] in [player1, player2]:    returned_val = [1, board[2]]
    elif board[0] == board[4] == board[8] and board[0] in [player1, player2]:    returned_val = [1, board[0]]
    elif board[2] == board[4] == board[6] and board[2] in [player1, player2]:    returned_val = [1, board[2]]
    elif '-' in board:    returned_val = [0, board[0]]
    else:    returned_val = [2, board[0]]
    return returned_val

def the_move(board, lst):
    """
    returns a random index out of the best moves
    """
    max_val = max(lst)
    max_array = []
    for i in range(len(lst)):
        if lst[i] == max_val:
            max_array.append(i)
    k = choice(max_array)
    cntr = 0
    for i in range(9):
        if board[i] == '-':
            cntr += 1
        if cntr == k+1:
            return i

def _minimax(board, move, comp, plr):
    """
    Implements the minimax algorithm. Returns 1 : computer has won.
    Returns -1 when player wins.
    When it's the computer's turn and it has to return a value to its parent,
    the maximum value from the array is chosen else, the minimum value.
    """
    global COUNT
    try:
        COUNT += 1
    except NameError:
        COUNT=0
    [is_win, who_won] = check_win(board, comp, plr)
    if is_win == 2:               
        return 0
    if is_win == 1:
        if who_won == comp:
            return 1
        if who_won == plr:
            return -1
    ret_list = []
    for i in range(9):
        if board[i] == '-':
            if move == comp:
                next_move = plr
            else:
                next_move = comp
            board[i] = move
            minimax_val = _minimax(board, next_move, comp, plr)
            board[i] = '-'
            ret_list.append(minimax_val)
            COUNT -= 1
    if COUNT <= 1:
        return ret_list
    if move == comp:
        return max(ret_list)
    else:
        return min(ret_list)
def minimax(*args):
    COUNT=0
    _minimax(*args)
a=socket()
a.bind(("localhost",11265))
while 1:
    cnx,infos=a.accept()
    grid=cnx.recv(9)
    if len(grid)<9:
        cnx.close()
        continue
    fail=False
    for x in grid.decode():
        if not x in "-OX":
            cnx.close()
            fail=True
            break
    if fail:
        continue
    grid=list(grid.decode())
    coup=check_win(grid,"O","X")[0]
    if coup==0:
        coup=the_move(grid,minimax(grid,"O","O","X"))
        coup+=check_win(grid,"O","X")[0]*9
    else:
        coup+=26
    cnx.send(bytes([coup]))
    cnx.close()
