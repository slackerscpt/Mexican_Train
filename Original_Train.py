#!/usr/bin/env python
"""
Provides ability to score the Mexican Train Game

"""

from os import system, name, getcwd, mkdir, path
from pathlib import Path
import json
from src.players import Player
from src.dominos import Dominos


currentDir = getcwd()
dataFolder = "%s\data" %currentDir
if not path.exists(dataFolder):
    print ('Creating `{}` folder'.format(dataFolder))
    mkdir(dataFolder)
playerFile = "%s\player.json" %dataFolder
scoreFile = "%s\score.json" %dataFolder


__author__ = "Josh Thayer"
__copyright__ = "Copyright 2021, slackerscpt inc"
__credits__ = ["Josh Thayer"]
__license__ = "GPL"
__version__ = "0.1.0"
__maintainer__ = "Josh Thayer"
__email__ = "slackerscpt@gmail.com"
__status__ = "Build"


#system('mode con: cols=150 lines=40')

players = {}

def write_players():
    #with open (playerFile) as f:
    x = {}
    for player in players:
        x[player] = {'name' : players[player].name, 'score' : players[player].score}
    with open (playerFile, 'w') as f:
        json.dump(x, f, indent=4)
 
def update_scores(round, double, scores):
    '''
    round is the round number you are record
    double is the double played for the round
    scores is a dict of the players scores for the round
    example : scores = {"1": 2, "2": 50}
    This will update the scores in the scores file, also update the running total in the players file
    '''
    data = {
        "{}".format(round) : {
            "double": "{}".format(double) ,
            "scores": scores
        }
    }
    temp = ''
    #If score file is not already created, we will need to create it. 
    #We also want to re-create the file if we are on round 1, to remove previous games scores
    if not path.exists(scoreFile) or round == 1:
        with open(scoreFile, 'w') as score_file:
            json.dump(data, score_file, indent=4)
    else:
        with open(scoreFile, 'r+') as score_file:
            temp = json.load(score_file)
            temp.update(data)
            score_file.seek(0)
            json.dump(temp, score_file, indent=4)



    #Update the players score
    with open (playerFile, 'r+') as player_file:
        playerTemp = json.load(player_file)
        for keys in players:
            players[keys].add_score(scores[keys])
            players[keys].add_round_score(round, scores[keys])
            playerTemp['{}'.format(keys)]['score'] = players[keys].score
            player_file.seek(0)
            json.dump(playerTemp, player_file, indent=4)

def clear(): 

  
    # for windows 
    if name == 'nt': 
        _ = system('cls') 
  
    # for mac and linux(here, os.name is 'posix') 
    else: 
        _ = system('clear') 

def players_count():
    player_count = input('Please enter the number of players[3-8]: ')
    try:
        player_count = int(player_count)
        if 3 <= player_count <= 8:
            return player_count
        else:
            print ('Player count needs to be between 3 and 8')
    except:
        print ('Please enter a number between 3 and 8')

    return

def setup_players(number_of_players):
    for i in range(1, number_of_players+1, 1):
        name = input('Please enter player {} name: '.format(i))
        players[i] = Player(name)

    #Let's write out the players
    write_players()

def domino_set():
    high_double = input('Please enter the highest double in your set: ')
    try: 
        high_double = int(high_double)
        return high_double
    except:
        print ('Please enter the number as int value')
    return

def pick_double(Deck):
    print ('Doubles left: {}'.format(Deck.doubles_set))
    try:
        double_to_play = int(input('Please enter which double played this round:'))
        if double_to_play in Deck.doubles_set:
            Deck.played(double_to_play)
        else: 
            print ('Please select a Double that has not been played')
            pick_double(Deck)
    except:
        print ('Please enter a number')
        pick_double(Deck)

def score_round(Deck):
    '''
    This section will take in the Deck, so we can determine what card was played. 
    In this function we will prompt the user for scores. 
    New update we will allow the score to be updated. 
    We will need to pass a variable to confirm scores. 
    '''
    

    #We plan to show a screen like this
    # <number> <name> <score given>
    # If no score given will read N/A
    recording_score = True
    round_scores = {}
    for keys in players.keys():
        round_scores[keys] = 0
    while (recording_score) :
    
        clear()
        print("Doubles Played: {}".format(Deck.played_set[-1]))

        print ('Please enter the scores of the players')
        for num in round_scores:
            print ('{}){} Score Recorded: {}'.format(num, players[num].name, round_scores[num]))
        print ('Please Enter 99 to record all scores')
        try:
            player_to_score = int(input('Please select player to enter score: '))
            if player_to_score in round_scores:
                score = int(input("{}'s Score: ".format(players[player_to_score].name)))
                round_scores[player_to_score] = score
            elif player_to_score == 99:
                recording_score = False
                #We will exit out
            else:
                print('Please select a player score')
        except:
            print ('Please enter a number of a player left to score')

    update_scores(len(Deck.played_set), Deck.played_set[-1], round_scores)

def display_round_scores():

    for player in players:
        print (players[player].name)
        print (players[player].get_round_score(1))
        print (players[player].rounds)
    with open(scoreFile, 'r') as score_file:
        temp = json.load(score_file)
        for rounds in temp:
            print (rounds)
            print (temp[rounds]['double'])
            print (temp[rounds]['scores'])


            #What we want it to look like when we print on the page
            #round | double played | player_name | player_name2
            # 1    |      1        |     50      |      0 
            # 2    |      0        |      0      |    200
            #______|_______________|_____________|_____________
            #Totals                |     50      |    2000


def display_scores(Deck):
    rankings = []
    for key in players:
        if len(rankings) == 0:
            rankings.append(key)
        else:
            for position, other_player in enumerate(rankings):
                if players[key].score < players[other_player].score:
                    rankings.insert(position, key)
                    break
                elif (position + 1) >= len(rankings):
                    rankings.append(key)
                    break

    if len(Deck.doubles_set) != 0:
        print ('Score Board after round {}:\n'.format(len(Deck.played_set)))  

    else:
        print ('Final Standings:\n')
        print ("\tWinner is {}\n\n".format(players[rankings[0]].name))
    for player in rankings:
        print("\t{}'s score: {}".format(players[player].name, players[player].score))
    
def setup_game():

    player_count = None
    high_double = None

    while player_count == None:
        player_count = players_count()
    setup_players(player_count)

    
    while high_double == None:
        high_double = domino_set()

    Deck = Dominos(high_double)

    return Deck

def play_game(Deck):
    while len(Deck.doubles_set) > 0:
        input('Press any key to start next round')
        clear()
        pick_double(Deck)
        score_round(Deck)
        clear()  
        display_scores(Deck) 
        
    input('Press any key to end the game')

def show_train():
    print("""
                 _-====-__-======-__-========-_____-============-__
               _(                                                 _)
            OO(           _/_ _  _  _/_   _/_ _  _  _/_           )_
           0  (_          (__(_)(_) (__   (__(_)(_) (__            _)
         o0     (_                                                _)
        o         '=-___-===-_____-========-___________-===-dwb-='
      .o                                _________
     . ______          ______________  |         |      _____
   _()_||__|| ________ |            |  |_________|   __||___||__
  (BNSF 1995| |      | |            | __Y______00_| |_         _|
 /-OO----OO""="OO--OO"="OO--------OO"="OO-------OO"="OO-------OO"=P
#####################################################################
    """)
    
def main():
    show_train()
    Deck = setup_game()
    play_game(Deck)
    display_round_scores()

if __name__ == '__main__':  
    main()
    

#X is \u274c
#check is \u2705
#print on same line: print("The Simpsons", end='\r')