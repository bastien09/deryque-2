<?php

class HL7File implements FileType {


	public static function isOfThisDataType($fichier,$extension) {
		return FALSE;
	}
	
	private static function table($digit, $value) {
		$table = array();
		$table = preg_split ( "/[\s,]+/" , $digit );
		$res = array();
  		for($i = 0; $i < $table.length; $i++ ) {
   			$res[$i*$value] = $table[$i];
  		}
		return $res;
	}
	
	public static function recupDonneesImportables($fichier) {
		$dom = new DOMDocument;
		$dom->loadXML($fichier);
		$sequence = $dom->getElementsByTagName('sequenceSet');
		$value = $sequence->getElementsByTagName('increment')->getAttributes('value');
		$digits = $sequence->getElementsByTagName('digits')
		$tableau = array();
		$i = 0;
		foreach ($digits as $digit) {
			$tableau[i] = table($digit,$value);
		}
	}
}
?>