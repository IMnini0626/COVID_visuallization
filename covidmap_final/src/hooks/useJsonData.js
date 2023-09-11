
export function useJsonData() {  
  const importAll =  file => file.keys().map(item => {return {date:item.split('/')[1].split('.')[0],value:file(item)}})  
  const files = importAll(require.context('./data/', false, /\.(json)$/));
  return files;
}
