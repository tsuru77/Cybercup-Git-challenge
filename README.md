# Procédure d'installation

**Prérequis :**

- Docker
- Git

Installez `Docker` sur votre pc :

[Docker Desktop: The #1 Containerization Tool for Developers | Docker](https://www.docker.com/products/docker-desktop/)

Installez `Git` sur votre pc :

https://github.com/git-guides/install-git

## Déploiement du challenge

- Commencez par cloner ce répo github avec la commande suivante :
    ```bash
    https://github.com/tsuru77/Cybercup-Git-challenge.git
    ```

- Exécuter cette commande dans votre terminal
    
    ```bash
    docker build  -t cybercup-git-challenge .
    docker run -d --name=cybercup-git-challenge \
    --hostname=cybercup-git-challenge \
    -e PASSWORD_ACCESS=true \
    -e USER_PASSWORD=cybercup  \
    -e USER_NAME=cybercup \
    -p 2222:2222 \
    -e SUDO_ACCESS=false \
    -v ~/.cybercup-git-challenge-config:/config \
    --rm cybercup-git-challenge
    ```
    

 

>>> Identifiants SSH pour faire copier les répertoires git :

user : cybercup

passwd : cybercup

- Structure des répertoires git
    
    ```bash
    ├── /
    │   └── repo
    │       ├── challenge1
    │       ├── challenge2
    │       ├── challenge3
    │       ├── challenge4
    │       ├── challenge5
    │       ├── challenge6
    │       └── challenge7
    ```
    

# Objectif du challenge


Ce challenge CTF vous enseignera les bases de git. Ce CTF est conteneurisé sous docker pour faciliter le déploiement.

Pour commencer les challenges vous devez récupérer les répertoires en `ssh` qui sont présents en [localhost](http://localhost) sur le port `2222`.

> 💡 Comment cloner les répertoire ?

git clone <protocole>://<user>@<ip_machine_distante>:<port><chemin_vers_le_challenge>
> 

Vous devez cloner tout répertoires challenges présent sur la machine distante, pour résoudre chacun des défis.

- Solution
    
    ```bash
    git clone ssh://cybercup@localhost:2222/repo/
    ```
    

 

## Commandes utiles :

- Commandes git
    - `git log`
    - `git commit`
    - `git merge`
    - `git blame`
    - `git cherry-pick`

[Les commandes GIT que vous devez absolument connaître !](https://www.hostinger.fr/tutoriels/commandes-git#Git_clone)

# Instructions challenges


- Défi 1 :
Clonez le dépôt pour obtenir le drapeau.
- Défi 2 :
Le drapeau a été modifié dans le fichier flag.txt. Regardez les logs pour l'obtenir.
- Défi 3 :
Il y a un bug dans un fichier source. Supprimez le bug et push les modifications à la branche origin.
- Défi 4 :
Le drapeau est en cours de réalisation. Une branche “feature” et une branche de “bug” ont été ajoutées et doivent être fusionnées.
- Défi 5 :
Quelqu'un a implémenté un bug, trouvez cette personne.
- Défi 6 :
Vous devez trouver le flag qui a été supprimé du fichier "flag.txt".
- Défi 7 :
Le flag est en cours de développement. Vous devez utiliser "git cherry-pick"

# Solutions

- Challenge 1
cat flag.txt

- Challenge 2
git log -p

- Challenge 3
Supprimez la ligne contenant le BUG à l'aide d'un éditeur de texte de votre choix.
commit -am "Correction du bogue"
git push

- Challenge  4
git log --all --graph -p
Les 2 modifications qui sont affichées avec la commande ci-dessus doivent être combinées pour récupérer le bon drapeau.
Cela est réalisé en fusionnant les deux branches dans main :
git merge origin/bug-flag-typo
git merge origin/feature-flag-entropy

- Challenge 5
Découvrez l'identifiant du commit où le bogue a été implémenté :
git blame flag.txt
Affichez les détails du commit :
git log c50d4edd --max-count 1

- Challenge 6
git log -p -S flag

- Challenge 7
Regardez le journal :
git log --all --graph
La modification 3 avec l'identifiant de commit d8b45514f5af9528c3ea75e1fb9134917920a0b9 doit être sélectionnée :
git cherry-pick d8b45514f5af9528c3ea75e1fb9134917920a0b9
cat flag.txt
