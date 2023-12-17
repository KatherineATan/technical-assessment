# SecurEd Technical Assessment Devlog

## 12/11/23 9:30 AM
Looked over the instructions of the assessment on GitHub and decided that I would try to attempt the 4 backend tasks.<br>
I started to try to configure my environment, installing the applications. I ran into a bit of trouble here, and I saw that I could code on codespaces on GitHub, which I decided to do.

## 12/15/23 3:30 PM
I looked over the code implemented for the hero and started to make the files I needed for the quest part based on what backend files hero had.

## 12/16/23 11:00 AM
Started trying to implement the logic for the quests like the hero had. I focused on trying to flesh out the code for the first two tasks.

## 12/16/23 8:00 PM
I started to try to run the tests for the code, and I ran into an error in the Quests.spec.js file:
TypeError: Cannot read properties of unified (reading 'id') <br>
I saw that this error was happening in each test in the quests, so I figured that the problem had to be with something that all the tasks had, which I realized was the quest id made in the beginning of the file to test these methods. <br>
From adding a line of debugging code (console.log('Response body:', res.body);), I saw that the response body was empty. <br>
I thought that this might be from the naming conventions, so I tried to fix that first. <br>
When that didn’t work, I thought maybe it was because I was not passing in a correct hero id into the quest I was trying to make. So I tried to make a hero before making the quest for testing in the file.

## 12/17/23 9:15 AM
I kept trying to figure out what was the cause of the problem where there was no quest after I was creating the quest. I was unable to figure it out. <br>
I fixed some errors within the router.js file, like defining the variable hero in the tasks that were using it. <br>
I looked over and fixed any other TODO notes I had left for myself.