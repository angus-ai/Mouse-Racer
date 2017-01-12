# Mouse Racer
Real time multi-player race game based on a Drag'n'drop gesture

##Installation
1. Decompresser l'archive mouseracer.zip sur votre ordinateur
2. Ouvrir l'invite commandes dans le dossier de decompression
3. Entrer la commande npm install an d'installer les modules necessaires
4. Entrer la commande node app pour lancer le serveur

Felicitations ! L'application devrait etre installee desormais.

##Jeu
* Sur votre navigateur allez sur l'adresse "localhost :8080/index.html"
* Un pseudo vous sera demande, choisissez un pseudo qui permettra au serveur de vous
identifer. (si vous choisissez un pseudo deja existant il sera remplace par pseudo bis)
* Sur votre ecran votre jeton est celui en vert, ceux de vos adversaires sont en bleu. Chaque
joueur doit deplacer son jeton vers le carre bleu a la fin du parcours.
* Vous devez eviter de toucher les pbstacles rouges, si tel est le cas vous repartez a 0.
* La partie se termine quand l'un des joueurs atteint le carre bleu ciel.

##Choix de programmation
* Toute la communication avec le serveur est basee sur le module Socket.io pour permettre
une synchronisation en temps reel des mouvements des joueurs.
* L'interface est basee sur la balise CANVAS. le mouvement est donc represente par un
rafraichissement continu de l'interface (l'interface est redessinee de facon continue) au
sein d'une boucle d'animation.
* La detection des collisions est faite grace a la methode getImageData de l'objet
context qui permet d'avoir la couleur d'une position donnee. La collision a donc lieu
quand le curseur pointe sur une couleur rouge.
* Ce choix de detection des collisions grace a un code couleur permet d'exploiter facilement
d'autres circuits (importes sous forme d'image). J'ai pense en particulier aux cartes
google maps qu'on pourrait exploiter directement et utiliser leur code couleur pour definir
les obstacles.
