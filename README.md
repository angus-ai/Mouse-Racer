# Mouse Racer
Real time multi-player race game based on a Drag’n’drop gesture

##Installation
1. Decompresser l'archive mouseracer.zip sur votre ordinateur
2. Ouvrir l'invite commandes dans le dossier de decompression
3. Entrer la commande npm install an d'installer les modules necessaires
4. Entrer la commande node app pour lancer le serveur

Felicitations ! L'application devrait etre installee desormais.

##Jeu
* Sur votre navigateur allez sur l'adresse "localhost :8080/index.html"
* Un pseudo vous sera demande, choisissez un pseudo qui permettra au serveur de vous
identier. (si vous choisissez un pseudo deja existant il sera remplace par pseudo bis)
* Sur votre ecran votre jeton est celui en vert, ceux de vos adversaires sont en bleu. Chaque
joueur doit deplacer son jeton vers le carre bleu a la n du parcours.
* Vous devez eviter de toucher les pbstacles rouges, si tel est le cas vous repartez a 0.
* La partie se termine quand l'un des joueurs atteint le carre bleu ciel.

##Choix de programmation
* Toute la communication avec le serveur est basee sur le module Socket.io pour permettre
une synchronisation en temps reel des mouvements des joueurs.
* L'interface est basee sur la balise CANVAS. le mouvement est donc represente par un
rafraichissement continu de l'interface (l'interface est redessinee de facon continue) au
sein d'une boucle d'animation.
* La detection des collisions est faite grace a la methode getImageData de l'objet
context qui permet d'avoir la couleur d'une position donnee. La collision a donc lieu
quand le curseur pointe sur une couleur rouge.
* Ce choix de detection des collisions gr^ace a un code couleur permet d'exploiter facilement
d'autres circuits (importes sous forme d'image). J'ai pense en particulier aux cartes
google maps qu'on pourrait exploiter directement et utiliser leur code couleur pour denir
les obstacles.
