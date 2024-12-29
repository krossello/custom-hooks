import { useEffect, useState } from "react";

const localCache = {}; 

export const useFetch = ( url ) => {

  const[ state, setState ] = useState({   // defino el estado inicial
    data: null,
    isLoading: true,
    hasError: false,
    error: null
  });

  useEffect(() => {
       getFetch();
  }, [url]);          // cuando el url cambia, se vuelve a hacer la petición http

  const setLoadingState = () => {         // y cuando se vuelve a hacer la petición, ponemos este custom hook en null otra vez  
    setState ({    
        data: null,
        isLoading: true, 
        hasError: false,    
        error: null
    })
  };  


  const getFetch = async() => {

    if ( localCache[url] ) {
        console.log("Usando caché");
        setState ({    
            data: localCache[url],
            isLoading: false, 
            hasError: false,    
            error: null
        })

        return;
    }

    setLoadingState();
    const resp = await fetch( url );

    // sleep para mostrar el "Cargando ..."
    await new Promise( resolve => setTimeout(resolve, 1500) );

    if( !resp.ok ) {          // si la respuesta falla
        setState ({
            data: null,        // null porque no devolvió nada 
            isLoading: false,  // isLoading false porque ya tenemos una respuesta
            hasError: true,    // si tenemos un erros
            error: {
                code: resp.status,
                message: resp.statusText
            }
        });
        return;
    }

    const data = await resp.json();
    setState ({
        data: data,
        isLoading: false, 
        hasError: false,    
        error: null
    });

    // Manejo del caché
    localCache[url] = data; // para no hacer una peticion cada vez que cambia el counter, guardo lo que ua consulté
    
    // console.log({data});
  }


  return {                      // retorno lo que visualmente podrán desestructurar de mi custom hook
    data: state.data, 
    isLoading: state.isLoading,
    hasError: state.hasError
  }
}