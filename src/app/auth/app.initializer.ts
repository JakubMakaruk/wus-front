import {AuthService} from "./auth.service";

export function appInitializer(authService: AuthService) {
  console.log('appInitializer');
  return () => new Promise(resolve => {
    authService.refreshToken()
      .subscribe()
      .add(resolve);
  });
}
