<?php

class HL7File implements FileType {

	public static function isOfThisDataType($fichier, $extension) {
		return TRUE;
	}

	private static function table($digit) {
		$table = array();
		$table = preg_split("/[\s]+/", $digit, NULL, PREG_SPLIT_NO_EMPTY);
		return $table;
	}

	public static function recupDonneesImportables($fichier) {

		echo <<<END
		<table class="bordered-table">
			<tr>
				<th><input type="checkbox" value="option1" name="optionsCheckboxes"/></th>
				<th>SequenceSet</th>
				<th>Sequences</th>
			</tr>
END;

		$dom = new DOMDocument("1.0", "utf-8");
		$dom -> load($fichier);
		$sequence = $dom -> getElementsByTagName('sequenceSet') -> item(0);
		$startTime = $sequence -> getElementsByTagName('head') -> item(0) -> getAttribute('value');
		$increment = $sequence -> getElementsByTagName('increment') -> item(0) -> getAttribute('value');
		$digits = $sequence -> getElementsByTagName('digits');
		/** tableaux[0] = timestamp, tableaux[1+] = valeurs */
		$tableaux = array();
		$i = 1;

		echo "<tr>";
		echo '<td><input type="checkbox" value="option1" name="optionsCheckboxes"/></td>';
		echo "<td>SequenceSet</td>";
		echo <<<END
					<td>
						<table class="zebra-striped bordered-table">
END;

		/** on extrait les séquences */
		foreach ($digits as $digit) {
			$code = $digit -> parentNode -> parentNode -> getElementsByTagName('code') -> item(0) -> getAttribute('code');

			echo <<<END
							<tr>
								<td><input type="checkbox" value="$code" name="$code" id="$code"/></td>
								<td><label class="td_label" for="$code">Sequence : $code</label></td>
							<tr>
END;

			$tableaux[$i] = self::table($digit -> nodeValue);
			$i++;
		}
		/* on remplit le timestamp */
		for ($j = 0; $j < count($tableaux[1]); $j++) {
			$tableaux[0][] = $startTime + $j * $increment;
		}

		//echo "<pre>".print_r($tableaux[0])."</pre>";

		echo <<<END
						</table>
					</td>
				</tr>
END;

		echo <<<END
		</table>
END;

		//partie selection des types de donnée :
		$nomDonnee = "ECG";
		$sum = sha1($nomDonnee);
		echo <<<END
		<p>Vous pouvez choisir de n'importer que certaines données :</p>
		<table class="zebra-striped bordered-table">
			<tr>
				<th><input type="checkbox" value="option1" name="optionsCheckboxes"/></th>
				<th>Nom de la donnée</th>
				<th>Associer la donnée à un relevé</th>
			</tr>
			<tr>
				<td><input type="checkbox" value="ECG" name="data_$sum" id="data_$sum"/></td>
				<td><label class="td_label" for="data_$sum">ECG</label></td>
				<td>
END;

		self::showAssocierAReleve($nomDonnee);
		echo <<<END
				</td>
			</tr>
END;

		echo "</table>";

	}

	private static function showAssocierAReleve($nomDonnee) {
		$releves_list = DataMod::getReleves($_SESSION['bd_id']);
		$sum = sha1($nomDonnee);
		$new_url = CNavigation::generateUrlToApp('Data', 'choose', array('iframe_mode' => true));
		echo <<<END
		<label for="assoc_$sum">Selectionnez le relevé</label>
		<div class="input">
			<select name="assoc_$sum" id="assoc_$sum">
END;
		foreach ($releves_list as $r) {
			echo '<option value="',     htmlspecialchars($r['name']), '">',     htmlspecialchars($r['name']), " (",     htmlspecialchars($r['modname']), ")", "</option>";
		}
		echo <<<END
			</select>

			<a class="btn" href="$new_url">Nouveau relevé</a>
	    </div>
END;
	}

	public static function submit_selection($data) {

	}

}
?>