'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nx-nest-angular-starter documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-dc0d7113e828b6f4903b5a6c067933e670c70fd6f8ebb8eafe6ccd614084b93bb385e23cd8679de7670bf4c26ca710e2301b3b21c7c0254f72b0e4282cced3be"' : 'data-target="#xs-controllers-links-module-AppModule-dc0d7113e828b6f4903b5a6c067933e670c70fd6f8ebb8eafe6ccd614084b93bb385e23cd8679de7670bf4c26ca710e2301b3b21c7c0254f72b0e4282cced3be"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-dc0d7113e828b6f4903b5a6c067933e670c70fd6f8ebb8eafe6ccd614084b93bb385e23cd8679de7670bf4c26ca710e2301b3b21c7c0254f72b0e4282cced3be"' :
                                            'id="xs-controllers-links-module-AppModule-dc0d7113e828b6f4903b5a6c067933e670c70fd6f8ebb8eafe6ccd614084b93bb385e23cd8679de7670bf4c26ca710e2301b3b21c7c0254f72b0e4282cced3be"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-dc0d7113e828b6f4903b5a6c067933e670c70fd6f8ebb8eafe6ccd614084b93bb385e23cd8679de7670bf4c26ca710e2301b3b21c7c0254f72b0e4282cced3be"' : 'data-target="#xs-injectables-links-module-AppModule-dc0d7113e828b6f4903b5a6c067933e670c70fd6f8ebb8eafe6ccd614084b93bb385e23cd8679de7670bf4c26ca710e2301b3b21c7c0254f72b0e4282cced3be"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-dc0d7113e828b6f4903b5a6c067933e670c70fd6f8ebb8eafe6ccd614084b93bb385e23cd8679de7670bf4c26ca710e2301b3b21c7c0254f72b0e4282cced3be"' :
                                        'id="xs-injectables-links-module-AppModule-dc0d7113e828b6f4903b5a6c067933e670c70fd6f8ebb8eafe6ccd614084b93bb385e23cd8679de7670bf4c26ca710e2301b3b21c7c0254f72b0e4282cced3be"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-1654a7dc36b98b67586ad79f4ff327db92a3d36900da2b2dc971bd79650b6b4c67c99491dae101024774b037177df7bdf4c63db26ad59396066baa8d7add41da"' : 'data-target="#xs-controllers-links-module-AuthModule-1654a7dc36b98b67586ad79f4ff327db92a3d36900da2b2dc971bd79650b6b4c67c99491dae101024774b037177df7bdf4c63db26ad59396066baa8d7add41da"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-1654a7dc36b98b67586ad79f4ff327db92a3d36900da2b2dc971bd79650b6b4c67c99491dae101024774b037177df7bdf4c63db26ad59396066baa8d7add41da"' :
                                            'id="xs-controllers-links-module-AuthModule-1654a7dc36b98b67586ad79f4ff327db92a3d36900da2b2dc971bd79650b6b4c67c99491dae101024774b037177df7bdf4c63db26ad59396066baa8d7add41da"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-1654a7dc36b98b67586ad79f4ff327db92a3d36900da2b2dc971bd79650b6b4c67c99491dae101024774b037177df7bdf4c63db26ad59396066baa8d7add41da"' : 'data-target="#xs-injectables-links-module-AuthModule-1654a7dc36b98b67586ad79f4ff327db92a3d36900da2b2dc971bd79650b6b4c67c99491dae101024774b037177df7bdf4c63db26ad59396066baa8d7add41da"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-1654a7dc36b98b67586ad79f4ff327db92a3d36900da2b2dc971bd79650b6b4c67c99491dae101024774b037177df7bdf4c63db26ad59396066baa8d7add41da"' :
                                        'id="xs-injectables-links-module-AuthModule-1654a7dc36b98b67586ad79f4ff327db92a3d36900da2b2dc971bd79650b6b4c67c99491dae101024774b037177df7bdf4c63db26ad59396066baa8d7add41da"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CaslModule.html" data-type="entity-link" >CaslModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CaslModule-5517c8ad190c4900c33d69c4d557910f7ece2b4d2c57492419502c268c48662e6890c5c27e70b74bb00df04dbacabab75657f447d1156ee1c6c2e0427d1830ed"' : 'data-target="#xs-injectables-links-module-CaslModule-5517c8ad190c4900c33d69c4d557910f7ece2b4d2c57492419502c268c48662e6890c5c27e70b74bb00df04dbacabab75657f447d1156ee1c6c2e0427d1830ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CaslModule-5517c8ad190c4900c33d69c4d557910f7ece2b4d2c57492419502c268c48662e6890c5c27e70b74bb00df04dbacabab75657f447d1156ee1c6c2e0427d1830ed"' :
                                        'id="xs-injectables-links-module-CaslModule-5517c8ad190c4900c33d69c4d557910f7ece2b4d2c57492419502c268c48662e6890c5c27e70b74bb00df04dbacabab75657f447d1156ee1c6c2e0427d1830ed"' }>
                                        <li class="link">
                                            <a href="injectables/CaslAbilityFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaslAbilityFactory</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-59813a71d11eeef55873160ee6f0a314b6f2ce56b9ada92e6e1130212ebeb2d4faae2ec65ccbcef200841b45f43f077432b69ed9233b6eb09f0654bd9dd70a21"' : 'data-target="#xs-controllers-links-module-UsersModule-59813a71d11eeef55873160ee6f0a314b6f2ce56b9ada92e6e1130212ebeb2d4faae2ec65ccbcef200841b45f43f077432b69ed9233b6eb09f0654bd9dd70a21"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-59813a71d11eeef55873160ee6f0a314b6f2ce56b9ada92e6e1130212ebeb2d4faae2ec65ccbcef200841b45f43f077432b69ed9233b6eb09f0654bd9dd70a21"' :
                                            'id="xs-controllers-links-module-UsersModule-59813a71d11eeef55873160ee6f0a314b6f2ce56b9ada92e6e1130212ebeb2d4faae2ec65ccbcef200841b45f43f077432b69ed9233b6eb09f0654bd9dd70a21"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-59813a71d11eeef55873160ee6f0a314b6f2ce56b9ada92e6e1130212ebeb2d4faae2ec65ccbcef200841b45f43f077432b69ed9233b6eb09f0654bd9dd70a21"' : 'data-target="#xs-injectables-links-module-UsersModule-59813a71d11eeef55873160ee6f0a314b6f2ce56b9ada92e6e1130212ebeb2d4faae2ec65ccbcef200841b45f43f077432b69ed9233b6eb09f0654bd9dd70a21"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-59813a71d11eeef55873160ee6f0a314b6f2ce56b9ada92e6e1130212ebeb2d4faae2ec65ccbcef200841b45f43f077432b69ed9233b6eb09f0654bd9dd70a21"' :
                                        'id="xs-injectables-links-module-UsersModule-59813a71d11eeef55873160ee6f0a314b6f2ce56b9ada92e6e1130212ebeb2d4faae2ec65ccbcef200841b45f43f077432b69ed9233b6eb09f0654bd9dd70a21"' }>
                                        <li class="link">
                                            <a href="injectables/CaslAbilityFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaslAbilityFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserRoles.html" data-type="entity-link" >UserRoles</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/DeleteUserPolicyHandler.html" data-type="entity-link" >DeleteUserPolicyHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordTransformer.html" data-type="entity-link" >PasswordTransformer</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/PoliciesGuard.html" data-type="entity-link" >PoliciesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IPolicyHandler.html" data-type="entity-link" >IPolicyHandler</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});