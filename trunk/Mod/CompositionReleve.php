<?php

/**
 * Permet de combiner plusieurs relevés en un seul.
 */
class CompositionReleve {

    private $_releveBean;

    /**
     * Trouve ou ajoute un nouveau relevé multiple.
     */
    public function __construct($name, $user) {
        $beans = R::findOrDispense('multi_releve', "name = ?", array($name));

        foreach ($beans as $bean) {
            $this -> _releveBean = $bean;
            break;
        }
        
        $this -> _releveBean -> name = $name;
        $this -> _releveBean -> user = $user;

    }

    /**
     * Ajoute un relevé à la liste.
     */
    public function addReleve($rname) {

        $releves = R::find('releve', 'name = ?', array($rname));

        foreach ($releves as $releve) {
            
            $this -> _releveBean -> releves[] = $releve;
            
        }

    }

    /**
     * Envoie le relevé multiple dans la BD.
     */
    public function save() {

        R::store($this -> _releveBean);
        R::commit();

    }
    
    /**
     * Retourne le relevé qui porte ce nom (NULL si il n'existe pas).
     */
    public static function getCReleve($name) {
        $resList = R::find('multi_releve', "name = ?", array($name));
        if(count($resList) === 0) {
            return NULL;
        } else {
            foreach ($resList as $res) {
                return $res;
            }
            
        }
    }

}
?>