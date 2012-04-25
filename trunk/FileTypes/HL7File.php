<?php

class HL7File implements FileType {


	public static function isOfThisDataType($fichier,$extension) {
		return TRUE;
	}
	
	private static function table($digit, $value) {
		$table = array();
		$table = preg_split ( "/[\s]+/" , $digit );
		$res = array();
  		for($i = 0; $i < $table.length; $i++ ) {
   			$res[$i*$value] = $table[$i];
  		}
		return $res;
	}
	
	public static function recupDonneesImportables($fichier) {
		$dom = new DOMDocument();
		$dom->loadXML($fichier);
		$sequence = $dom->getElementsByTagName('sequenceSet');
		$value = $sequence->getElementsByTagName('increment')->getAttributes('value');
		$digits = $sequence->getElementsByTagName('digits');
		$tableaux = array();
		foreach ($digits as $digit) {
			$tableaux[] = table($digit,$value);
		}
		
		
		echo <<<END
		<table class="bordered-table">
			<tr>
				<th><input type="checkbox" value="option1" name="optionsCheckboxes"/></th>
				<th>Sequences</th>
			</tr>
END;


		//TODO ajouter données
		
		echo <<<END
		</table>
END;
		
		
	}
}
?>