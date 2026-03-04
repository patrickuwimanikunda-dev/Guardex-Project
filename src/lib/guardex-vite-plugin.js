export default function guardex(options = {}) {
  return {
    name: 'guardex-plugin',
    configResolved(config) {
      console.log('Guardex plugin active', options);
    }
  };
}
