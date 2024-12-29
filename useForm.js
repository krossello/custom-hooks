import { useState } from "react";

export const useForm = ( initialForm = {} ) => {

    const[ formState, setFormState ] = useState({ initialForm });     // Inicializa el estado del formulario

    const onInputChange = ({ target }) => {  // Actualiza el estado al escribir en los campos
        const { name, value } = target;

        setFormState({
            ...formState, 
            [ name ]: value
        });
    };
    
    const onResetForm = () => {  
        setFormState( initialForm );
    };

    return {           // Retorna el estado y la función de cambio
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}

