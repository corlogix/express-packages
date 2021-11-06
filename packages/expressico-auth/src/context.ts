export interface AuthConfig {
  tokenSecret: string;
  tokenLife: string | number;
  locateUser: (payload: any) => Promise<any>;
  createUser: (payload: any) => Promise<any>;
}

class AuthContext implements AuthConfig {
  tokenSecret: string = "SuperSecretPassword";
  tokenLife: string | number = "1d";

  locateUser = (payload): any => Promise.reject("Not defined");
  createUser = (payload): any => Promise.reject("Not defined");

  loadConfig(config: AuthConfig) {
    for (const key in config) {
      this[key] = config[key];
    }
  }
}

export default new AuthContext();