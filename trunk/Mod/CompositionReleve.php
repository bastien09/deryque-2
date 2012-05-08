<?php

/**
 * Permet de combiner plusieurs relevés en un seul.
 */
class CompositionReleve {

    private $_releveBean;

    /**
     * Trouve ou ajoute un nouveau relevé multiple.
     */
    public function __construct($name) {
        $this -> _releveBean = R::findOrDispense('multi_releve', "name = ?", array($name));

        $this -> _releveBean -> name = name;

    }

    /**
     * Ajoute un relevé à la liste.
     */
    public function addReleve($rname) {

        $this -> _releveBean -> releves[] = R::find('releve', 'name = ?', array($rname));

    }

    /**
     * Envoie le relevé multiple dans la BD.
     */
    public function save() {

        R::store($this -> _releveBean);

    }

}
?>