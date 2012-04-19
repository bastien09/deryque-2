<?php

class DataGPX implements DataType {

	public static function isOfThisDataType($fichier, $extension) {
		return $extension === ".gpx";
	}

	/**
	 * Permet d'afficher un formulaire de sélection des données à importer pour le fichier uploadé de type GPX
	 */
	public static function recupDonneesImportables($fichier) {

		$gpx = self::getData($fichier);

		echo <<<END
		<table class="bordered-table">
			<tr>
				<th><input type="checkbox" value="option1" name="optionsCheckboxes"/></th>
				<th>Tracks</th>
				<th>Track Segments</th>
			</tr>
END;
		foreach ($gpx->children() as $gpx_data) {
			echo "<tr>";
			if ($gpx_data -> getName() === "trk") {

				$nameTrk = $gpx_data -> xpath("name");
				$sum = sha1($nameTrk[0]);

				$hdate = AbstractView::formateDate($nameTrk[0]);
				$hname = htmlspecialchars($nameTrk[0]);
				echo '<td><input type="checkbox" value="', $hname, '" name="trk_', $sum, '" id="trk_', $sum, '"/></td>';
				echo "<td><label class=\"td_label\" for=\"trk_$sum\">Trk: $hdate</label></td>";

				echo <<<END
				<td>
					<table class="zebra-striped bordered-table">
END;
				foreach ($gpx_data->children() as $trksegs) {
					if ($trksegs -> getName() === "trkseg") {
						//recup le temps du premier trackpoint du trackseg en question
						$trkpt1 = $trksegs -> xpath("trkpt[1]/time");
						if (empty($trkpt1)) {
							continue;
						}
						$nameTrkseg = htmlspecialchars($trkpt1[0]);
						$hdate = AbstractView::formateDate($trkpt1[0]);
						$sum = sha1($trkpt1[0]);
						$nb = count($trksegs -> children());
						echo <<<END
						<tr>
							<td><input type="checkbox" value="$nameTrkseg" name="seg_$sum" id="seg_$sum"/></td>
							<td><label class="td_label" for="seg_$sum">Trkseg: $hdate</label></td>
							<td>$nb</td>
						<tr>
END;
					}
				}
				echo "</table></td>";
			}
			echo "</tr>";
		}
		echo "</table>";

		//partie selection des types de donnée :
		$nomDonnee = "PositionGPS";
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
				<td><input type="checkbox" value="PositionGPS" name="data_$sum" id="data_$sum"/></td>
				<td><label class="td_label" for="data_$sum">Position GPS</label></td>
				<td>
END;
		//'
		self::showAssocierAReleve($nomDonnee);
		echo <<<END
				</td>
			</tr>
END;
		$nomDonnee = "Vitesse";
		$sum = sha1($nomDonnee);
		echo <<<END
			<tr>
				<td><input type="checkbox" value="Vitesse" name="data_$sum" id="data_$sum"/></td>
				<td><label class="td_label" for="data_$sum">Vitesse</label></td>
				<td>
END;
		self::showAssocierAReleve($nomDonnee);
		echo <<<END
				</td>
			</tr>
END;
		$nomDonnee = "Calories";
		$sum = sha1($nomDonnee);
		echo <<<END
			<tr>
				<td><input type="checkbox" value="Calories" name="data_$sum" id="data_$sum"/></td>
				<td><label class="td_label" for="data_$sum">Calories</label></td>
				<td>
END;
		self::showAssocierAReleve($nomDonnee);
		echo <<<END
				</td>
			</tr>
END;
		$extensions_dispos = $gpx -> xpath("/gpx/trk/trkseg/trkpt/extensions/TrackPointExtension");
		if (!empty($extensions_dispos)) {
			$extensions_dispos = $extensions_dispos[0];
			foreach ($extensions_dispos->children() as $extdisp) {
				$chose = htmlspecialchars($extdisp -> getName());
				$sum = sha1($extdisp -> getName());
				echo <<<END
				<tr>
					<td><input type="checkbox" value="$chose" name="data_$sum" id="data_$sum"/></td>
					<td><label class="td_label" for="data_$sum">$chose</label></td>
					<td>
END;
				self::showAssocierAReleve($chose);
				echo <<<END
					</td>
				</tr>
END;
			}
		}
		echo "</table>";
		//Import::deleteDirContent("Uploaded");
	}

	private static function getData($fichier) {
		$data = file_get_contents($fichier);
		$data = preg_replace('/<gpx.*?>/', '<gpx>', $data, 1);
		$data = preg_replace('/<\\/tp1:(.+)>/', '</$1>', $data);
		$data = preg_replace('/<tp1:(.+)>/', '<$1>', $data);
		$gpx = simplexml_load_string($data);
		return $gpx;
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
			echo '<option value="',   htmlspecialchars($r['name']), '">',   htmlspecialchars($r['name']), " (",   htmlspecialchars($r['modname']), ")", "</option>";
		}
		echo <<<END
			</select>

			<a class="btn" href="$new_url">Nouveau relevé</a>
	    </div>
END;
		//DataImportView::showNewReleveForm($nomDonnee);
	}

}
?>