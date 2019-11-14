# Hackathon1

## MASTERMIND

### Object of the Game

The object of Mastermind is to correctly guess the Codemaster's secret code in as few guesses as possible. You gain information about the code by submitting guesses and analyzing the Codemaster's responses.  If you can accurately determine the exact code that was hidden within 10 guesses, you win!

Now get cracking!

### Gameplay

The Codemaster chooses a secret code of four pegs, made from any combination of the six colors available. Colors may be repeated, but all four spots must be used. (In our case, the computer will play this role!) The Codebreaker then submits a guess, again using any four pegs. You will then receive feedback about how accurate your guess was via the white and black pegs. A black peg means that one of the guessed pegs was the correct color in the correct location. Every white peg indicates one of the guessed pegs was in the code, but is not in the correct location. *The order of the black and white pegs do not imply anything about the code.* If a color is repeated in the guess, but not repeated in the secret code, it will only score one peg (black if in the correct location, white otherwise). Using the clues given, you can identify patterns signalling what colors must be in the code, and which ones defintely are not. Keep guessing until you figure out the correct code!

### Tips

Drag a peg from the palette to the guess zone on the right side of the board. When you are satisfied with you entry, click "Submit" to register your guess and see the results. You can remove pegs from the guess-input area by pressing "Reset". You can start a new game any time by clicking "New Game".

Use your guesses wisely. You have only 10 chances to crack the code! Some strategies focus on identifying colors you know are **not** in the code, and then using those to narrow down the positions for other colors. A common starting guess would be two each of two colors. You can find some strategy tips [here](http://codebreaker.creativitygames.net/mastermind_strategy_for_real_people.php) and a **much more** extensive treatment [here](http://www.geometer.org/mathcircles/mastermind.pdf).

### About the Game

The modern version of the game, played with a board and pegs, was invented in 1970 by Mordecai Meirowitz, an Israeli postmaster and telecommunications expert. It all started with 'Bulls and Cows', an English code-breaking game of unknown origin played with paper and pencil. Each player writes a secret sequence of four numbers, and the opponent has to guess the sequence. Matching digits are called “bulls,” while wrong guesses are “cows”.

While there are now many variations of the game, with more and fewer colors to choose from, and different numbers of pegs in the secret code, the original version, still most widely played today, uses six colors and four locations. This calculates to a total of 6<sub>4</sub> = 1,296 possible patterns for the code. In 1977, Donald Knuth demonstrated that the codebreaker can solve the pattern in five moves or fewer, using an algorithm that progressively reduces the number of possible patterns. He published a [paper about it](http://www.cs.uni.edu/~wallingf/teaching/cs3530/resources/knuth-mastermind.pdf) describing how a computer can identify which guesses will be the most helpful at deducing the code.
