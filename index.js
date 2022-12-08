
if (localStorage.getItem("empleado") === null) {
    localStorage.setItem("empleado", JSON.stringify([]))
}

let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreImput = document.querySelector('#nombre');
const puestoImput = document.querySelector('#puesto');
const btnAgregar = document.querySelector('#ntnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreImput.value === '' || puestoImput.value === ''){
        alert('Todos los campos son obligatorios.')
        return;
    }
    
    if(editando){
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreImput.value;
        objEmpleado.puesto = puestoImput.value;

        agregarEmpleado();
    }

}    
// Usando el LocalStorage.getItem obtenemos la clave de la key empleado que luego realizamos el cargue de la informacion al objempleado y guardamos todos los cambios usando Localstorage.setItem cumpliedo así con el CREATE
function agregarEmpleado(){
        const empleado = JSON.parse(localStorage.getItem("empleado")); 
        

        empleado.push({...objEmpleado});

        localStorage.setItem("empleado", JSON.stringify(empleado));

        mostrarEmpleados();

        formulario.reset();

        limpiarObjeto();
    }

    function limpiarObjeto(){
        objEmpleado.id = '';
        objEmpleado.nombre = '';
        objEmpleado.puesto = '';
    }
//Realizamos la const listaempleado usando un LocalStorage para poder leer la llave empleado desde el localstorage y cumpliendo así el READ
    function mostrarEmpleados(){

        limpiarHTML();

        const divEmpleados = document.querySelector('.div-empleados');

        const listaempleado = JSON.parse(localStorage.getItem("empleado"))

        listaempleado.forEach( empleado => {
            const {id, nombre , puesto} = empleado;

            const parrafo = document.createElement('p');
            parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
            parrafo.dataset.id = id;

            const editarBoton = document.createElement('button');
            editarBoton.onclick = () => cargarEmpleado(empleado);
            editarBoton.textContent = 'Editar';
            editarBoton.classList.add('btn','btn-editar');
            parrafo.append(editarBoton);

            const eliminarBoton = document.createElement('button');
            eliminarBoton.onclick = () => eliminarEmpleado(id);
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn','btn-eliminar');
            parrafo.append(eliminarBoton);

            const hr = document.createElement('hr');

            divEmpleados.appendChild(parrafo);
            divEmpleados.appendChild(hr);

        });
    }


    function cargarEmpleado(empleado){

        const {id, nombre, puesto} = empleado;

        nombreImput.value = nombre;
        puestoImput.value = puesto;

        objEmpleado.id = id;

        formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

        editando = true;

    }

    //Realizando una variable = empleado y obteniendo la informacion desde el LocalStorage de la llave empleado, y cuando realizamos la modificación la cargue nuevamente al LocalStorage, cumpliendo así el UPDATE
    function editarEmpleado() {
        objEmpleado.nombre = nombreImput.value;
        objEmpleado.puesto = puestoImput.value;

        let empleado = JSON.parse(localStorage.getItem("empleado"));

        empleado = empleado.map( empleado => {
            if(empleado.id === objEmpleado.id) {
                empleado.id = objEmpleado.id;
                empleado.nombre = objEmpleado.nombre;
                empleado.puesto = objEmpleado.puesto;
            }
            return empleado;
        });
        
        localStorage.setItem("empleado", JSON.stringify(empleado));

        limpiarHTML();
        mostrarEmpleados();

        formulario.reset();

        formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
        editando = false;
    }
//Realizando una variable = empleado que nos permita obtener desde el localstorage la llave empleado, y que cuando realizemos la eliminación se guarde la dicha tambien en el localStorage, cumpliendo asi el DELETE
    function eliminarEmpleado(id){

        let empleado = JSON.parse(localStorage.getItem("empleado")); 
        
        empleado = empleado.filter(empleado => empleado.id !== id);


        localStorage.setItem("empleado", JSON.stringify(empleado));

        
        limpiarHTML();
        mostrarEmpleados();

    }

    function limpiarHTML(){
        const divEmpleados = document.querySelector('.div-empleados');
        while(divEmpleados.firstChild){
            divEmpleados.removeChild(divEmpleados.firstChild);
        }
    }
    
    window.onload = ()=>{
        mostrarEmpleados();
    }

