<?php

	interface FileType {
			
		public static function isOfThisDataType($fichier,$extension);
		
		public static function recupDonneesImportables($fichier);
		
	}

?>