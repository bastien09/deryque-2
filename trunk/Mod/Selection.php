<?php

/**
 * Associe une ou plusieurs selections à un relevé.
 */
class Selection {

    private $_selectionBean;
    private $_releveBean;

    /**
     * Ajoute une selection au relevé.
     */
    public function __construct($rname, $graphName, $begin, $end) {
        $beans = R::find('releve', "name = ?", array($rname));

        foreach ($beans as $bean) {
            $this -> _releveBean = $bean;
            break;
        }

        $this -> _selectionBean = R::dispense('selection');

        $this -> _selectionBean -> releve = $this -> _releveBean;
        $this -> _selectionBean -> name = $graphName;
        $this -> _selectionBean -> begin = $begin;
        $this -> _selectionBean -> end = $end;

    }

    /**
     * Envoie la selection dans la BD.
     */
    public function save() {

        R::store($this -> _releveBean);

        R::store($this -> _selectionBean);

    }

    /**
     * Récupère toutes les selections associées à un relevé.
     */
    public static function getSelections($rname) {
        $releves = R::find('releve', "name = ?", array($rname));

        foreach ($releves as $releve) {
            return $releve -> ownSelection;
        }

    }

}
?>