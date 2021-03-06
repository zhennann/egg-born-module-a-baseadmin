module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class Version extends app.Service {

    async update(options) {
      if (options.version === 1) {
      }
    }

    async init(options) {
      if (options.version === 1) {
        // roleFunctions
        const roleFunctions = [
          { roleName: 'system', name: 'user' },
          { roleName: 'system', name: 'role' },
          { roleName: 'system', name: 'atomRight' },
          { roleName: 'system', name: 'functionRight' },
          { roleName: 'system', name: 'auth' },
        ];
        await this.ctx.meta.role.addRoleFunctionBatch({ roleFunctions });
      }

      if (options.version === 2) {
        // remove menuRight
        const fun = await this.ctx.meta.function._get({ module: moduleInfo.relativeName, name: 'menuRight' });
        if (fun) {
          //  1. aFunction
          await this.ctx.model.delete('aFunction', { id: fun.id });
          //  2. aFunctionLocale
          await this.ctx.model.delete('aFunctionLocale', { functionId: fun.id });
          //  3. aFunctionStar
          await this.ctx.model.delete('aFunctionStar', { functionId: fun.id });
          //  4. aRoleFunction
          await this.ctx.model.delete('aRoleFunction', { functionId: fun.id });
        }
      }

      if (options.version === 3) {
        // roleFunctions
        const roleFunctions = [
          { roleName: 'system', name: 'menu' },
        ];
        await this.ctx.meta.role.addRoleFunctionBatch({ roleFunctions });

        // menu: 1->0
        const functions = 'user,role,atomRight,functionRight,auth'.split(',');
        for (const name of functions) {
          const func = await this.ctx.meta.function.get({ name });
          await this.ctx.model.function.update({ id: func.id, sceneId: 0, menu: 0 });
        }
      }

    }

  }

  return Version;
};
