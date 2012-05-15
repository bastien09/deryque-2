<?php

/**
 * Associe une ou plusieurs compositions à un relevé.
 */
class Composition {

    private $_compositionBean;
    private $_releveBean;

    /**
     * Ajoute une composition au relevé.
     */
    public function __construct($rname, $graphName, $begin, $end) {
        $beans = R::find('releve', "name = ?", array($rname));

        foreach ($beans as $bean) {
            $this -> _releveBean = $bean;
            break;
        }

        $this -> _compositionBean = R::dispense('composition');

        $this -> _compositionBean -> releve = $this -> _releveBean;
        $this -> _compositionBean -> name = $graphName;
        $this -> _compositionBean -> begin = $begin;
        $this -> _compositionBean -> end = $end;

    }

    /**
     * Envoie la composition dans la BD.
     */
    public function save() {

        R::store($this -> _releveBean);

        R::store($this -> _compositionBean);

    }

    /**
     * Récupère toutes les compositions associées à un relevé.
     */
    public static function getCompositions($rname) {
        $releves = R::find('releve', "name = ?", array($name));

        foreach ($releves as $releve) {
            return $releve -> ownComposition;
        }

    }

}
?>