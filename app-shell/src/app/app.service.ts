import { Injectable, signal } from '@angular/core';

const users = [
  {
    username: 'user',
    password: 'user',
  },
];

const remoteModules = [
  {
    remoteEntry: 'http://localhost:3001/remoteEntry.js',
    remoteName: 'angular_mfe_app',
    exposedModule: 'AngularAppLoader',
  },
  {
    remoteEntry: 'http://localhost:3002/remoteEntry.js',
    remoteName: 'react_mfe_app',
    exposedModule: 'ReactAppLoader',
  },
  {
    remoteEntry: 'vite:http://localhost:3003/remoteEntry.js',
    remoteName: 'vue_mfe_app',
    exposedModule: 'VueAppLoader',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AppService {
  loggedUser: { username: string; password: string } | null = null;
  authorized_modules: typeof remoteModules = [];

  hasAllModulesLoaded = signal(false); // if all modules are loaded from second time the widget view will be loaded immediately

  login(username: string, password: string) {
    const user = users.find(
      (item) => item.username === username && item.password === password
    );

    if (!user) return false;

    this.loggedUser = user;

    this.authorized_modules = remoteModules; // all modules

    return true;
  }
}
