<?php

	interface DataType {
			
		public static function isOfThisDataType($fichier,$extension);
		
		public static function recupDonneesImportables($fichier);
		
	}

?>