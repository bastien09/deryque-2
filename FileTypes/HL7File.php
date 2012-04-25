<?php

class HL7File implements FileType {


	public static function isOfThisDataType($fichier,$extension) {
		return TRUE;
	}
	
	private static function table($digit) {
		$table = array();
		$table = preg_split ( "/[\s]+/" , $digit, NULL, PREG_SPLIT_NO_EMPTY );
		return $table;
	}
	
	public static function recupDonneesImportables($fichier) {
		$dom = new DOMDocument("1.0","utf-8");
		$dom->load($fichier);
		$sequence = $dom->getElementsByTagName('sequenceSet')->item(0);
		$increment = $sequence->getElementsByTagName('increment')->item(0)->getAttribute('value');
		$digits = $sequence->getElementsByTagName('digits');
		/** tableaux[0] = timestamp, tableaux[1+] = valeurs */
		$tableaux = array();
		$i = 1;
		/** on extrait les séquences */
		foreach ($digits as $digit) {
			$tableaux[$i] = self::table($digit->nodeValue);
			$i++;
		}
		/* on remplit le timestamp */
		for($j = 0; $j < count($tableaux[1]); $j++) {
			$tableaux[0][] = $j*$increment;
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