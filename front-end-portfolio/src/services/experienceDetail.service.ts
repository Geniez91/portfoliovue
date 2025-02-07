export async function loadMarkdown(routerName:string):Promise<Response>{
    let response:Response;
    switch(routerName){
      case 'TechupClimate':
      response = await fetch('/content/Carbonscore.md'); 
      break;
      case 'IUT Paris Cité':
       response = await fetch('/content/IUTParis.md');
       break;
      case 'Centre de Recherche et des Restauration des musées de France':
        response = await fetch('/content/C2RMF.md');
      break;
      case 'Fruity-Ice':
      response = await fetch('/content/FruityIce.md');
      break;
      default:
      response = await fetch('/content/Carbonscore.md'); 
    }
    return response
  }