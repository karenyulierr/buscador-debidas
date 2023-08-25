import { ref,reactive, onMounted } from 'vue';
import { defineStore } from 'pinia';
import APIServices from '../services/APIService';

import { useModalStore } from './modal';

export const useBebidasStore = defineStore('bebidas',()=>{

    const modal = useModalStore();
    const categorias = ref([]);
    const busqueda = reactive({
        nombre:'',
        categoria:''
    })

    const recetas= ref([]);

    const receta = 

    onMounted(async function() {
        const {data:{drinks}} = await APIServices.obtenerCategorias();    
        categorias.value=drinks;
    })

    async function obtenerRecetas(){
      const {data:{drinks}} =  await APIServices.buscarRecetas(busqueda);
      recetas.value=drinks;
    }

    async function seleccionarBebida(id){
        const {data:{drinks}} =  await APIServices.buscarReceta(id);
        modal.handleClickModal();
    }

    return{
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida
    }
});