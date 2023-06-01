# Cat World: a p5.js Artwork
An interactive website themed on after hours of a witch's assistant cat.

# Instructions
Hi, my work uses only mouse and clicks to interact. If an object can be interacted with, it will become bigger or have a circle around it leading the user to click. One of such interactions require webcam to view the mirror in the main room scene (big rectangle above table). Thus the user would need to turn their camera on to be able to use this function. 
PS: Do not turn camera on until on the mirror scene or inside castle scenes as it might slow the program.

# Artist Statement
As a child with little freedom, I used to love spending time with myself being mischievous in the absence of my parents. It was a "forbidden fruit" that I was always drawn towards. I loved to do the opposite of what instructed or expected. Thus, for my artwork, my main character is an innocent looking black cat of the witch who after she leaves makes troubles at every instance. Mr Cattie is not only cunning but also cute. He in the absence of his mistress acts as the owner of the place by mixing potions or reading her private diary. Although he can obediently do the basic chores but as a playful soul he can't help but give in to his nature. He will bravely fight the ghosts in graveyard and draw with his paws but also try to eat the treasured fish of his mistress. He has a ghost friend in the haunted castle guiding but not controlling him. He creates messes but also looks proudly in the mirror as the narcissist he can be. Have fun being the lawless troublemaker in this wizarly world of Bulsavia!

I have used mouse as the only way to interact. The mouse controls the cats position and clicks to interact or conversate in the opening scene with the witch. The interactable objects either scale up in size or they have an yellow circle around/an arrow indicating that the scene dynamics might change on a click. These were to lead user to try interacting. I have also linked the scenes and they can be entered multiple times by clicking on door or action user wants to zoom in. I tried to make these interactions as intuitive as possible for easier exploration. Every room has a different theme and different interactions with the main character present throughout.

# Recent developments
In my artwork I have used creative machine learning as follows:
1. I extract human facial features - eyes, nose, and ears - from webcam video using pose detection. Using these key points I tried to add a "cat filter" on humans to make it seem like when the user as my main character (the cat) looks into mirror they find themselves. To do this I tried to enlarge the size of ears, nose and whiskers when the face is nearer and vice versa. To determine distance between camera and face, I used the distance between ears as my criteria.
2. I used m5 library to imitate chronicles of the imaginary land of Bulsavia. To do this I used Markov model to randomly generate tokens/words as sentences in the "book" from 2 text files which sometimes do not have a proper construction thus seems gibberish.

To simulate the real world, the following were applied:
1. When spider is touched, it falls with accelaration by simulating gravity.
2. The cat's movement is restricted to the ground and it cannot fly.
3. The size of orb's shadow varies on it's current size and most objects have a shadow to make it realistic.
