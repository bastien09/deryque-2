<?php

class HelpView{
	public static function showHelp(){
		echo <<<END
		<div class="alert-message block-message info">
			<h2>Bienvenue sur l'aide du site Inspecteur Deryque !<h2>
		</div>
		<div class="well">
			<h3>Menus</h3>
			<p>La barre de menus se compose de 4 boutons et d'un menu utilisateur. Le bouton "Relevés" permet de consulter ses relevés personnels et d'en ajouter de nouveaux manuellement. Le bouton "Tableau de Bord" est un lien vers la page principale. Le bouton "Importer des données permet à l'utilisateur d'importer les données contenues dans un fichier généré par un appareil de mesure. Pour l'instant les formats reconnus sont .gpx et .tcx"</p>
		</div>
		<div class="well">
			<h3>Page principale - ou Tableau de Bord</h3>
			<p>Sur la gauche de la page apparait la liste de vos relevés enregistrés. Vous pouvez afficher une représentation graphique pour une donnée simplement en la sélectionnant. Si vous disposez de beaucoup de relevés, vous pouvez utiliser le champ de recherche pour trouver rapidement le relevé. Notez que vous pouvez utiliser des expressions régulières dans ce champ de recherche. Vous pouvez sélectionner ou désélectionner un relevé, ce qui s'impactera automatiquement sur la vue.</p>
		</div>
		<div class="well">
			<h3>Importer des données</h3>
			<p>Vous pouvez choisir d'importer n'importe quel fichier, cependant le site étant en développement, seuls les fichiers de type GPX ou TCX sont traités. une fois le fichier choisi, une page résumant le contenu du fichier apparait, vous invitant à sélectionner les donner qui vous intéressent, et à créer les relevés correspondants. Il suffit de remplir le "formulaire d'import" et de faire "Importer" ; vos données seront ensuite accessibles via la page "Relevés" ou le "Tableau de Bord"</p>
		</div>
END;
	}
}
?>
