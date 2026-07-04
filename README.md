# THIS IS NOT THE ORIGINAL PROJECT. 
## Please check the repository web2-2023-project-group_17 pinned on my profile! 


#
#
#
#


# Boilerplate pour vos applications modernes utilisant Webpack, Phaser (Jeux en 2D) et un routeur
# How to use ?
- Si vous ne l'avez pas fait, vous pouvez cloner le repo associé au boilerplate pour initier votre application : `git clone https://github.com/e-vinci/js-router-boilerplate.git` ou `git clone https://github.com/e-vinci/js-router-boilerplate.git nom-de-votre-projet` pour créer votre projet nommé `nom-de-votre-projet`.
- **package.json** est le fichier de configuration de votre projet. Veuillez le mettre à jour afin de :
    - donnnez un nom à votre projet & une description ;
    - vous identifier comme auteur.
- ⚡ Si vous avez cloné votre projet au sein d'un repo existant, Git ne trackera pas ce nouveau projet ; en effet, Git ne tracque pas des projets Git dans des projets Git.
Pour vous assurer que Git traque votre nouveau projet imbriqué dans un repo, vous devez effacer le répertoire **.git** se trouvant dans votre nouveau projet. N'hésitez pas aussi à effacer **.gitignore** se trouvant dans votre nouveau projet.
- Par contre, si vous souhaitez créer un nouveau repo à l'aide de votre boilerplate, 
vous pouvez utiliser le **.gitignore** existant. Vous pouvez aussi éventuellement utiliser le 
**.git**, mais cela signifie que vous hériterez de tous les changements associés au boilerplate, 
et que vous devrez changer l'origine (`git remote remove origin`, `git remote add origin LINK_TO_YOUR_REPO`). Nous vous recommandons plutôt d'effacer le répertoire **.git** et de 
réinitialiser un projet git (`git init`, `git remote add origin LINK_TO_YOUR_REPO`).
- Installation des dépendances et démarrage du boilerplate : 
```shell
cd nom-de-votre-projet # (le nom donné au répertoire de votre projet)
npm i # (equivalent de npm install)
npm start
```

## Comment configurer l'URL de base vers votre API et utiliser cette URL
- Dans **webpack.config**, veuillez configurer l'URL de votre API en fonction du **build mode** :
    - **`DEVELOPMENT_API_BASE_URL`** : laissez **'/api'** si vous souhaitez utiliser le proxy pour appeler votre api ou **http://localhost:3000** si vous préférez appeler directement l'API. Dans ce dernier cas, vous devez avoir autorisé l'origine de votre frontend (**http://localhost:8080**) via les CORS. 
    - **`PRODUCTION_API_BASE_URL`** : donnez l'URL où votre application sera déployée, comme **'https://your-app-name.azurewebsites.net'**.
- Lorsque vous lancerez la commande **npm start**, c'est **`DEVELOPMENT_API_BASE_URL`** qui sera utilisée pour appeler votre API grâce à la variable globale **`process.env.API_BASE_URL`**.
- Lorsque vous lancerez la commande **npm run deploy**, c'est **`DEVELOPMENT_API_BASE_URL`** qui sera utilisée pour appeler votre API grâce à la variable globale **`process.env.API_BASE_URL`**.
- Pour faire vos appels vers vos API, utilisez la variable globale **`process.env.API_BASE_URL`** au sein de vos **fetch**. Par exemple : 
    ```js
    fetch(`${process.env.API_BASE_URL}/auths/login`, options);
    ```
- Lors du build, en fonction des valeurs que vous avez données à **`DEVELOPMENT_API_BASE_URL`** et **`PRODUCTION_API_BASE_URL`**, **`process.env.API_BASE_URL`** sera remplacée par l'URL de base vers votre API grâce au code du boilerplate !

## Comment configurer le déploiement sur GitHub Pages ?
- Si vous souhaitez déployer votre application qui utilise ce boilerplate sur GitHub Pages, veuillez suivre cette procédure. Dans un premier temps, vous devez décider si vous souhaitez déployer votre page en tant que :
    - **user** ou **organization site** : votre nom de repo doit être votre username ou le nom de votre organisation sur GitHub. L'URL de votre frontend sur GitHub Pages sera : "**https://[username ou orgnanization-name].github.io**". Dans ce cas-là, vous ne pouvez avoir qu'un seul site déployé sur ce nom de domaine.
    - **project site** : vous pouvez donner le nom que vous souhaitez à votre repo (autre que votre username ou le nom de votre organisation). L'URL de votre frontend sera : "**https://[username ou orgnanization-name].github.io/repo-name-for-your-frontend**". Notons que le fait d'avoir un site qui tourne pas à la racine d'une serveur de fichiers rend compliqué la gestion du routing au sein d'une SPA. Même si cette gestion n'est pas aisée à programmer, cela vous est offert dans ce boilerplate, il faut juste bien configurer le préfixe qui se trouvera avant chaque route que vous auriez configuré.
- Créez un nouveau web repo **vide** et **publique** sur GitHub Pages.
- Créez un repo local contenant le code de votre frontend basé sur ce boilerplate :
    - N'oubliez pas de supprimer le répertoire **.git** existant si vous avez clôné ce boilerplate.
    - Tapez ces commandes pour initialiser votre repo local et le synchroniser avec votre web repo :
    ```shell
    git init
    git add .
    git commit -m "init"
    git remote add origin https://url-to-your-web-repo.git
    git branch -M main
    git push -u origin main
    ```
- Si vous avez choisi de créer un **user** ou un **organization site**, vous pouvez passer au point suivant, au déploiement.
- Si vous avez choisi de créer un **project site** sur GitHub (plutôt qu'un **user** ou **organization site**), vous devez configurer le préfixe qui sera à prendre en compte lors du déploiement du frontend. Par exemple, si votre web repo se nomme "**my-super-frontend**", vous indiquerez au sein de **webpack.config** :
```js
const PRODUCTION_PATH_PREFIX = '/my-super-frontend/';
```
Dans ce cas, tous les appels à votre site seront fonctionnels, le router fera le travail d'offrir la bonne page. Ainsi, même si l'utilisateur accède à https://[username].github.io/my-super-frontend/login, le router ira chercher la route correspondant au chemin **/login** et non pas à la route **/my-super-frontend/login** !

## Comment déployer sur GitHub Pages ?
- Une fois que tout est configuré, il ne reste plus qu'à lancer le build de production du frontend et le déploiement. Tout cela est offert par le boilerplate en tapant la commande :
```shell
npm run deploy
```
- La librairie **gh-pages** permet de faire un **push** d'un snapshot du contenu du build de production (se trouvant dans **/dist/**) vers la branche **gh-pages** de votre web repo.
- Si GitHub Pages est configuré correctement au niveau de votre web repo, quelques secondes ou minutes après que "Published" ait été affiché dans votre terminal, votre frontend sera disponible sur le cloud via l'URL : https://[username].github.io ou https://[username].github.io/repo-name-for-your-frontend.

## Comment configurer GitHub Pages sur votre web repo
- Accédez à l'URL de votre web repo sur **github.com**.
- Cliquez sur **Settings**, puis sur **Pages**.
- Assurez-vous que : 
    - la **Source** soit : **Deploy from a branch**.
    - la **Branch** soit : **gh-pages**.
- Vous avez l'URL qui vous est donnée et vous pouvez, via **Settings**, puis **Pages**, cliquer sur **Visit site**.
- Vous pouvez visualiser tous les builds qui ont été tentés sur GitHub Pages à la racine de votre web repo ; à droite de la page, il y à une section **Environments** et un lien **github-pages** : cliquez sur ce lien et vous verrez l'historique des déploiements de votre frontend sur GitHub Pages.


## Que se passe-t-il en cas de refresh d'une page offert par GitHub Pages ?
- Imaginez que l'utilisateur fasse un refresh à l'URL **https://[username].github.io/my-super-frontend/login**. GitHub Pages est juste un CDN, un serveur de fichiers statiques. Il n'y a pas de fichier qui correspond à cette URL ! Dès lors, sans un boilerplate bien configuré, vous recevriez une **erreur 404** 😨 !
- Lors du build, ce boilerplate créer un fichier **404.html** qui est identique à **index.html**. Ainsi, lorsqu'une ressource n'existe pas, GitHub Page renverra le contenu de 404.html, et ça sera donc notre SPA sera entièrement fonctionnelle, même en cas de refresh 😅 !

## Utilisation du linter et du formater
- Pour bénéficier de feedback sur le code lors de son écriture, par rapport au respect du style 
des règles d'Airbnb, vous devez avoir installé l'extension **ESLint** au sein de VS Code. 
- Pour que la configuration du formater offerte dans ce boilerplate soit utile, 
vous devez avoir installé l'extension **prettier** au sein de VS Code.
- vous pouvez facilement formatter votre code conformément au style d'Airbnb :
    - soit en tapant **Shift Alt F** ;
    - soit en faisant un clic droit sur votre script, **Format Document** ; la première fois, il se peut que vous deviez sélectionner **prettier** comme formater.
- Pour info, la configuration des règles de **ESLint** se fait dans le fichier 
**.eslintrc.js** devant se trouver à la racine d'un projet et offert au sein du boilerplate.
- Pour info, la configuration des règles de **prettier** se fait dans le fichier 
**.prettierrc.js** devant se trouver à la racine d'un projet et offert au sein du boilerplate.
## How to ? Ajout d'un package
- Installation d'un package : `npm i nomDuPackage`
Pour plus d'info sur un package, ou pour trouver un package traitant d'un sujet qui vous intéresse : https://www.npmjs.com
- Modification du code pour l'utiliser, au sein de `/src/index.js` (ou tout autre module .js) : chargement de la librairie soit via `import` (ou `require`) du package. Généralement, les instructions d'installation et d'utilisation d'un package sont données sur le site de https://www.npmjs.com.
- Si quelqu'un souhaite installer et exécuter ce projet, la gestion des dépendances est très simple : copie du répertoire du projet (sans `node_modules`), `npm instal`, `npm start`. Il n'y a donc pas de librairies à gérer manuellement pour reprendre le projet d'un tiers.

## Utilisation d'assets (images, fonts, CSS...)
- Attention, quand vous utilisez des assets au sein de votre application, comme des images, l'URL d'un asset après le build de votre application n'est pas la même qu'avant le build. 
- Pour bien gérer les URL au sein de votre JavaScript, vous devez d'abord importer vos assets. Vous trouverez un exemple de comment ajouter des assets à une scène de jeux dans `/Components/Game/GameScene.js` : 
```javascript
import starAsset from "../../assets/star.png";
// ...
this.load.image("sky", skyAsset); // l'URL de star.png sera la bonne lors du build
```
- Plus d'information sur la gestion des assets via Webpack : https://webpack.js.org/guides/asset-management/ 

## Tout savoir sur le Routeur offert dans ce boilerplate
- Le rôle du nouveau routeur `/Components/Router/Router.js` sera d'implémenter ces fonctions :
    - Routage lors d’un clic sur un élément de la barre de navigation via `navbarWrapper.addEventListener("click",...)` :
        - Appel du composant associé à l’élément cliqué (et auto-render du composant)
        - Affichage dans le browser de l’URL associée à l’élément cliqué
        - Garder l’URL dans l’historique
    - Routage lors du chargement du frontend (ou lors d'un refresh) via `navbarWrapper.addEventListener("load",...)` :
    appel du composant associé à l’URL en cours : par exemple, si c'est "/", la HomePage sera appelée.
    - Routage lors de l’utilisation de l’historique du browser via `navbarWrapper.addEventListener("popstate",...)` : appel du composant associé à l’URL se trouvant dans la pile gérant le "state" du browser (l'historique)
    - Routage lors de redirection via la méthode `Redirect(uri)` :
        - Appel du composant associé à la redirection (et auto-render du composant)
        - Affichage dans le browser de l’URL associée à l’élément redirigé
        - Garder l’URL dans l’historique
- La configuration des routes est à faire au sein de `/Components/Router/routes.js`. Voici un exemple de configuration :
```js
const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/logout": Logout,
};
```
- La `HomePage` n'est pas chargé dans `index.js.` C'est le rôle du Router de charger la bonne page en se focalisant sur l'URL.
- De plus, il faut appeler le `Router` au sein de `index.js`

## Redirection d'une page vers une autre
- La page doit faire appel à la fonction `` du `Router` pour rediriger vers une autre page. Dans ce boilerplate, un example est fourni pour la `NewPage` qui redirige vers la `HomePage` lors d'un clic sur un bouton.
- Vous pouvez utiliser la fonction `Navigate` présente dans `/src/Components/Router/Navigate.js/` en fonction de n'importe quel type d'événement : lors du succès de l'authentification, lors d'un clic sur un élément....

## Conclusion
- L'utilisation de ce boilerplate permet d'avoir un serveur de développement hyper performant, de développer avec beaucoup de confort, de faciliter la structure d'un projet, de gérer les dépendances, de transformer les assets de manière centralisée, ...

# Resources
- Pour information, la source de la configuration de Webpack provient principalement de [Phaser 3 Webpack Project Template](https://github.com/photonstorm/phaser3-project-template).  
Le jeu présenté dans le boilerplate est basé sur le tutoriel nommé [Modern JavaScript Phaser 3 Tutorial : Part 1 to Part 5](https://blog.ourcade.co/posts/2020/make-first-phaser-3-game-modern-javascript-part1/) et utilise Webpack au lieu de Parcel comme module bundler.
- favicon : https://upload.wikimedia.org/wikipedia/commons/3/3e/AIGA_information.svg, AIGA (American Institute of Graphic Arts)
