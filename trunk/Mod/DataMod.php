<?php

class DataMod extends AbstractMod
{
	public $display_prefs = null;

	public static function getDataTypes() {
		$data = array();

		foreach (scandir('Data') as $dossier) {
			$dossier = self::secureDossier($dossier);
			if (strlen($dossier) && $dossier[0] !== '.' && is_dir('Data/'.$dossier) && file_exists("Data/$dossier/D$dossier.php")) {
				require_once("Data/$dossier/D$dossier.php");
				$classe = "D$dossier";
				$nom = $classe::nom;
				$data[] = new DataMod($nom, $dossier);
			}
		}

		return $data;
	}

	public static function loadDataType($dossier) {
		$dossier = self::secureDossier($dossier);
		if (!file_exists("Data/$dossier/D$dossier.php")) return null;
		require_once("Data/$dossier/D$dossier.php");
		$classe = "D$dossier";
		$nom = $classe::nom;
		$mod = new DataMod($nom, $dossier);
		$mod->display_prefs = explode(' ', $classe::display_prefs);	
		return $mod;
	}

	public static function modExist($dossier) {
		$dossier = self::secureDossier($dossier);
		return file_exists("Data/$dossier/D$dossier.php");
	}

	public static function getReleve($nom, $user_id) {
		return R::getRow('select r.id, name, description, modname, PicMinLine, PicMaxLine from releve r, datamod d where r.user_id = ? and r.mod_id = d.id and r.name = ?', array($user_id, $nom)); 
	}

	public function save($user, $releve, $data)
	{
		$vars = $this->getVariables();

		$tuple = R::dispense('d_'.$this->dossier);
		$tuple->user = $user;
		$tuple->releve = $releve;

		foreach($vars as $key => $var) {
			$tuple->$key = $data->$key;
		}

		return R::store($tuple);
	}

	public static function getReleves($user_id) {
		return R::getAll('select name, description, modname from releve r, datamod d where r.user_id = ? and r.mod_id = d.id order by name', array($user_id)); 
	}
}
?>
