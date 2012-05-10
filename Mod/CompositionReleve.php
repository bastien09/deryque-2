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

    }

}
?>