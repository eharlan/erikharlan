// app.js

export class App {
  configureRouter(config, router) {
    config.title = 'Erik Harlan';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: 'home/home', title: 'Home'},
      {route: 'projects', name: 'projects', moduleId: 'profile/profile',  title: 'Projects'},
      {route: 'contact', name: 'contact', moduleId: 'contact/contact', title: 'Contact'},
	  {route: 'about', name: 'about', moduleId: 'about/about',  title: 'About'}
    ]);
    this.router = router;
  }
}