// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('fcws', [
  'ionic',
  'fcws.controllers',
  'fcws.services',
  'fcws.utils',
  'angularMoment',
  'ngCordova'
])

.run(function($ionicPlatform,amMoment) {
  // change language to zh-cn
  amMoment.changeLocale('zh-cn');

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.navBar.alignTitle('center');

  $stateProvider
  // login page
  .state('signin', {
    url: "/signin",
    templateUrl: 'templates/auth/signin.html',
    controller: 'LogInCtrl'
  })

  .state('sidemenu.changepw', {
    url: "/changepw",
    views: {
      'menuContent': {
        templateUrl: 'templates/auth/changepw.html',
        controller: 'ChangepwCtrl'
        }
      }
    })


  //   .state('auth', {
  //     url: "/auth",
  //     abstract: true,
  //     templateUrl: "templates/auth/tab.html",
  //     controller: "AuthTabCtrl"
  //   })

  // login page
  // .state('auth.signin', {
  //   url: "/signin",
  //   views: {
  //     'signinTab': {
  //       templateUrl: 'templates/auth/signin.html',
  //       controller: 'LogInCtrl'
  //     }
  //   }
  // })
  //
  // // signup page
  // .state('auth.signup', {
  //   url: '/signup',
  //   views: {
  //     'signupTab': {
  //       templateUrl: 'templates/auth/signup.html',
  //       controller: 'SignUpCtrl'
  //     }
  //   }
  // })


  .state('sidemenu', {
    url: '/sidemenu',
    abstract: true,
    templateUrl: 'templates/sidemenu.html',
    controller: 'SidemenuCtrl',
  })

  .state('sidemenu.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard/index.html',
        controller: 'DashboardCtrl',
      }
    }
  })

  .state('sidemenu.user', {
    url: '/user',
    views: {
      'menuContent': {
        templateUrl: 'templates/user/index.html',
        controller: 'UserCtrl',
      }
    }
  })

  .state('sidemenu.message', {
    url: '/message',
    views: {
      'menuContent': {
        templateUrl: 'templates/message/index.html',
        controller: 'MessageCtrl',
      }
    }
  })

  .state('sidemenu.posts', {
    url: '/posts',
    views: {
      'menuContent': {
        templateUrl: 'templates/post/list.html',
        controller: 'PostsCtrl'
      }
    }
  })

  .state('sidemenu.post', {
    url: '/posts/:post_id',
    views: {
      'menuContent': {
        templateUrl: "templates/post/detail.html",
        controller: 'PostCtrl',
      }
    }
  })

  .state('sidemenu.control', {
    url: '/control',
    views: {
      'menuContent': {
        templateUrl: 'templates/control/tab.html',
        controller: 'ControlCtrl',
      }
    }
  })

  .state('sidemenu.control.broadcast', {
    url: '/broadcast',
    views: {
      'broadcast': {
        templateUrl: 'templates/control/broadcast.html',
        controller: 'ControlBroadcastCtrl',
      }
    }
  })

  .state('sidemenu.control.group', {
    url: '/group',
    views: {
      'group': {
        templateUrl: 'templates/control/group.html',
        controller: 'ControlGroupCtrl',
      }
    }
  })

  .state('sidemenu.control.text', {
    url: '/text',
    views: {
      'text': {
        templateUrl: 'templates/control/text.html',
        controller: 'ControlTextCtrl',
      }
    }
  })

  .state('sidemenu.control.view', {
    url: '/view',
    views: {
      'view': {
        templateUrl: 'templates/control/view.html',
        controller: 'ControlViewCtrl',
      }
    }
  })

  .state('sidemenu.control.point', {
    url: '/point',
    views: {
      'point': {
        templateUrl: 'templates/control/point.html',
        controller: 'ControlPointCtrl',
      }
    }
  })

  .state('sidemenu.train', {
    url: '/train',
    views: {
      'menuContent': {
        templateUrl: 'templates/train/tab.html',
        controller: 'TrainCtrl'
      }
    }
  })

  .state('sidemenu.train.plan', {
    url: '/plan',
    views: {
      'plan': {
        templateUrl: 'templates/train/plan.html',
        controller: 'TrainPlanCtrl',
      }
    }
  })

  .state('sidemenu.train.rule', {
    url: '/rule',
    views: {
      'rule': {
        templateUrl: 'templates/train/rule.html',
        controller: 'TrainRuleCtrl',
      }
    }
  })

  .state('sidemenu.train.search', {
    url: '/search',
    views: {
      'search': {
        templateUrl: 'templates/train/search.html',
        controller: 'TrainSearchCtrl',
      }
    }
  })

  .state('sidemenu.train.exam', {
    url: '/exam',
    views: {
      'exam': {
        templateUrl: 'templates/train/exam.html',
        controller: 'TrainExamCtrl',
      }
    }
  })

  .state('sidemenu.education', {
    url: '/education',
    views: {
      'menuContent': {
        templateUrl: 'templates/education/tab.html',
        controller: 'EducationCtrl'
      }
    }
  })

  .state('sidemenu.education.plan', {
    url: '/plan',
    views: {
      'plan': {
        templateUrl: 'templates/education/plan.html',
        controller: 'EducationPlanCtrl',
      }
    }
  })

  //成功交流
  .state('sidemenu.education.achieve', {
    url: '/achieve',
    views: {
      'achieve': {
        templateUrl: 'templates/education/achieve.html',
        controller: 'EducationAchieveCtrl',
      }
    }
  })

  .state('sidemenu.education.rule', {
    url: '/rule',
    views: {
      'rule': {
        templateUrl: 'templates/education/rule.html',
        controller: 'EducationRuleCtrl',
      }
    }
  })

  //教育资料
  .state('sidemenu.education.edu', {
    url: '/edu',
    views: {
      'edu': {
        templateUrl: 'templates/education/edu.html',
        controller: 'EducationEduCtrl',
      }
    }
  })

  .state('sidemenu.defence', {
    url: '/defence',
    views: {
      'menuContent': {
        templateUrl: 'templates/defence/tab.html',
        controller: 'DefenceCtrl',
      }
    }
  })

  .state('sidemenu.defence.organization', {
    url: '/organization',
    views: {
      'organization': {
        templateUrl: 'templates/defence/organization.html',
        controller: 'DefenceOrganizationCtrl',
      }
    }
  })

  .state('sidemenu.defence.rule', {
    url: '/rule',
    views: {
      'rule': {
        templateUrl: 'templates/defence/rule.html',
        controller: 'DefenceRuleCtrl',
      }
    }
  })

  .state('sidemenu.defence.call', {
    url: '/call',
    views: {
      'call': {
        templateUrl: 'templates/defence/call.html',
        controller: 'DefenceCallCtrl',
      }
    }
  })



  .state('sidemenu.defence.potential', {
    url: '/potential',
    views: {
      'potential': {
        templateUrl: 'templates/defence/potential.html',
        controller: 'DefencePotentialCtrl',
      }
    }
  })

  .state('sidemenu.contact_area', {
    url: '/contact_area',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact/contact_area.html',
        controller: 'ContactAreaCtrl',
      }
    }
  })

  .state('sidemenu.contact_town', {
    url: '/contact_town',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact/contact_town.html',
        controller: 'ContactTownCtrl',
      }
    }
  })

  .state('sidemenu.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact/contact.html',
        controller: 'ContactCtrl',
      }
    }
  })

    // .state('sidemenu.contact.unit', {
    //   url: '/unit',
    //   views: {
    //     'unit': {
    //       templateUrl: 'templates/contact/unit.html',
    //       controller: 'ContactUnitCtrl',
    //     }
    //   }
    // })


    // .state('sidemenu.contact.mission', {
    //   url: '/mission',
    //   views: {
    //     'mission': {
    //       templateUrl: 'templates/contact/mission.html',
    //       controller: 'ContactWorkCtrl',
    //     }
    //   }
    // })
    //
    // .state('sidemenu.contact.userdefine', {
    //   url: '/userdefine',
    //   views: {
    //     'userdefine': {
    //       templateUrl: 'templates/contact/userdefine.html',
    //       controller: 'ContactUserdefineCtrl',
    //     }
    //   }
    // })

  .state('sidemenu.config', {
    url: '/config',
    views: {
      'menuContent': {
        templateUrl: 'templates/config.html',
        controller: 'ConfigCtrl',
      }
    }
  });

  $urlRouterProvider.otherwise('/signin');

})
.constant('SERVER', {
  // if using local server
   // api: 'http://localhost:9804/api/v1',
   // docs:'http://localhost:9804/docs'

   api: 'http://localhost:3000'
  // api: 'http://192.168.59.103:9804/api/v1',
  // docs:'http://192.168.59.103:9804/docs'


  // if using our public heroku server
 // api: 'http://nemoworks.info:9804/api/v1',
 // docs:'http://nemoworks.info:9804/docs',
  // orgs:'http://nemoworks.info:9804/orgnizations'
});


angular.module('fcws.services', []);

angular.module('fcws.controllers',['ionic', 'fcws.services']);
