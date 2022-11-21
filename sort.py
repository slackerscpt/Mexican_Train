#Working on a sort algorith that hand

from turtle import position
from numpy import count_nonzero


scores = [
    [0,1,1],
    [1,2,2],
    [2,1,3]
]

print(scores)
def update_position(scores):
    update = False
    for counter , playerScores in enumerate(scores):
        print(playerScores)
        #for player, score, position in playerScores:
        if (counter > 0):
            previous = counter - 1
            if scores[previous][1] > playerScores[1]:
                print ('True')
                update = True
                print("Player: {}".format(playerScores[0]))
                old_position = scores[previous][2]
                scores[previous][2] = playerScores[2]
                scores[counter][2] = old_position
    # if update:
    #     scores = update_position(scores)
    return scores

#scores = update_position(scores)

# score_keeper = []
# for player, score, position in scores:
#     print(score)
#     score_keeper.append(score)
# score_keeper.sort()
# print (score_keeper)
# print (score_keeper.sort())

scores.sort(key = lambda x: x[1])
print (scores)

