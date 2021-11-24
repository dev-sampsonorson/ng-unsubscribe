export function Unsubscribe(keys: string[]) {
  return <T extends { new(...args: any[]): any }>(componentDef: T) => {
    let ngOnDestroyOriginal = componentDef.prototype.ngOnDestroy;
    const newComponentDef = class extends componentDef {
      constructor(...args: any[]) {
        super(...args);
      }

      ngOnDestroy(): void {
        if (ngOnDestroyOriginal)
          ngOnDestroyOriginal.call(this);

        keys.forEach(key => {
          if (this[key]) {
            this[key]?.unsubscribe();
          }
        });
      }
    }

    componentDef.prototype.ngOnDestroy = newComponentDef.prototype.ngOnDestroy;

    return newComponentDef;
  }
}




/* const originalCtor = componentDef.prototype.constructor;
componentDef.prototype.constructor = (args: any) => {
  console.log('args', args);

  const instance = originalCtor.call(...args);

  return instance;
} */
/* const originalFactory = componentType.ngComponentDef.factory;
componentType.ngComponentDef.factory = (args: any) => {
  const component = originalFactory(...args);

  componentType.ngComponentDef.onDestroy = () => {
    if (component.ngOnDestroy) {
      component.ngOnDestroy();
    }

    keys.forEach(key => {
      if (component[key]) {
        component[key]?.unsubscribe();
      }
    });

  }

  return component;
}; */
