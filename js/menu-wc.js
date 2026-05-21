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
                    <a href="index.html" data-type="index-link">nest-rest-typeorm-boilerplate documentation</a>
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
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-183786014684eabb447752f27a0eadd5901c8e3ecd903ec655f2a86a42c204f7681314ece7ee861b39d6f82c963139934e9451985d423f7312629bab549fb5c3"' : 'data-bs-target="#xs-controllers-links-module-AppModule-183786014684eabb447752f27a0eadd5901c8e3ecd903ec655f2a86a42c204f7681314ece7ee861b39d6f82c963139934e9451985d423f7312629bab549fb5c3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-183786014684eabb447752f27a0eadd5901c8e3ecd903ec655f2a86a42c204f7681314ece7ee861b39d6f82c963139934e9451985d423f7312629bab549fb5c3"' :
                                            'id="xs-controllers-links-module-AppModule-183786014684eabb447752f27a0eadd5901c8e3ecd903ec655f2a86a42c204f7681314ece7ee861b39d6f82c963139934e9451985d423f7312629bab549fb5c3"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-183786014684eabb447752f27a0eadd5901c8e3ecd903ec655f2a86a42c204f7681314ece7ee861b39d6f82c963139934e9451985d423f7312629bab549fb5c3"' : 'data-bs-target="#xs-injectables-links-module-AppModule-183786014684eabb447752f27a0eadd5901c8e3ecd903ec655f2a86a42c204f7681314ece7ee861b39d6f82c963139934e9451985d423f7312629bab549fb5c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-183786014684eabb447752f27a0eadd5901c8e3ecd903ec655f2a86a42c204f7681314ece7ee861b39d6f82c963139934e9451985d423f7312629bab549fb5c3"' :
                                        'id="xs-injectables-links-module-AppModule-183786014684eabb447752f27a0eadd5901c8e3ecd903ec655f2a86a42c204f7681314ece7ee861b39d6f82c963139934e9451985d423f7312629bab549fb5c3"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-ec201e8a429c26562f7ae09771d0cb932c6f4ca40e7b2b69d2ef80cfa5b3906088626825b4c69818bfc88d9b574774d657af1da293302c3f91460442f64f4199"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-ec201e8a429c26562f7ae09771d0cb932c6f4ca40e7b2b69d2ef80cfa5b3906088626825b4c69818bfc88d9b574774d657af1da293302c3f91460442f64f4199"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ec201e8a429c26562f7ae09771d0cb932c6f4ca40e7b2b69d2ef80cfa5b3906088626825b4c69818bfc88d9b574774d657af1da293302c3f91460442f64f4199"' :
                                            'id="xs-controllers-links-module-AuthModule-ec201e8a429c26562f7ae09771d0cb932c6f4ca40e7b2b69d2ef80cfa5b3906088626825b4c69818bfc88d9b574774d657af1da293302c3f91460442f64f4199"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-ec201e8a429c26562f7ae09771d0cb932c6f4ca40e7b2b69d2ef80cfa5b3906088626825b4c69818bfc88d9b574774d657af1da293302c3f91460442f64f4199"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-ec201e8a429c26562f7ae09771d0cb932c6f4ca40e7b2b69d2ef80cfa5b3906088626825b4c69818bfc88d9b574774d657af1da293302c3f91460442f64f4199"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ec201e8a429c26562f7ae09771d0cb932c6f4ca40e7b2b69d2ef80cfa5b3906088626825b4c69818bfc88d9b574774d657af1da293302c3f91460442f64f4199"' :
                                        'id="xs-injectables-links-module-AuthModule-ec201e8a429c26562f7ae09771d0cb932c6f4ca40e7b2b69d2ef80cfa5b3906088626825b4c69818bfc88d9b574774d657af1da293302c3f91460442f64f4199"' }>
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
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CaslModule-394dfe91f625f773ab2c6f36a548635880e611126b01c79ad76a979407ccb62c5bae1a153fe429a91d49d96ae74884f78651d51e3aff58e7358277c45a885d78"' : 'data-bs-target="#xs-injectables-links-module-CaslModule-394dfe91f625f773ab2c6f36a548635880e611126b01c79ad76a979407ccb62c5bae1a153fe429a91d49d96ae74884f78651d51e3aff58e7358277c45a885d78"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CaslModule-394dfe91f625f773ab2c6f36a548635880e611126b01c79ad76a979407ccb62c5bae1a153fe429a91d49d96ae74884f78651d51e3aff58e7358277c45a885d78"' :
                                        'id="xs-injectables-links-module-CaslModule-394dfe91f625f773ab2c6f36a548635880e611126b01c79ad76a979407ccb62c5bae1a153fe429a91d49d96ae74884f78651d51e3aff58e7358277c45a885d78"' }>
                                        <li class="link">
                                            <a href="injectables/CaslFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaslFactory</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/McpModule.html" data-type="entity-link" >McpModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-McpModule-0dfe1c2c4ff80d8eaa81317001897ec7b8fcded47a13b54c43420e66f2f4945e7bb61016d29a32b4f49d4a7c13a7d8cae5c8cb05deefcce0b0995d8d7d778a9a"' : 'data-bs-target="#xs-controllers-links-module-McpModule-0dfe1c2c4ff80d8eaa81317001897ec7b8fcded47a13b54c43420e66f2f4945e7bb61016d29a32b4f49d4a7c13a7d8cae5c8cb05deefcce0b0995d8d7d778a9a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-McpModule-0dfe1c2c4ff80d8eaa81317001897ec7b8fcded47a13b54c43420e66f2f4945e7bb61016d29a32b4f49d4a7c13a7d8cae5c8cb05deefcce0b0995d8d7d778a9a"' :
                                            'id="xs-controllers-links-module-McpModule-0dfe1c2c4ff80d8eaa81317001897ec7b8fcded47a13b54c43420e66f2f4945e7bb61016d29a32b4f49d4a7c13a7d8cae5c8cb05deefcce0b0995d8d7d778a9a"' }>
                                            <li class="link">
                                                <a href="controllers/McpController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >McpController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-McpModule-0dfe1c2c4ff80d8eaa81317001897ec7b8fcded47a13b54c43420e66f2f4945e7bb61016d29a32b4f49d4a7c13a7d8cae5c8cb05deefcce0b0995d8d7d778a9a"' : 'data-bs-target="#xs-injectables-links-module-McpModule-0dfe1c2c4ff80d8eaa81317001897ec7b8fcded47a13b54c43420e66f2f4945e7bb61016d29a32b4f49d4a7c13a7d8cae5c8cb05deefcce0b0995d8d7d778a9a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-McpModule-0dfe1c2c4ff80d8eaa81317001897ec7b8fcded47a13b54c43420e66f2f4945e7bb61016d29a32b4f49d4a7c13a7d8cae5c8cb05deefcce0b0995d8d7d778a9a"' :
                                        'id="xs-injectables-links-module-McpModule-0dfe1c2c4ff80d8eaa81317001897ec7b8fcded47a13b54c43420e66f2f4945e7bb61016d29a32b4f49d4a7c13a7d8cae5c8cb05deefcce0b0995d8d7d778a9a"' }>
                                        <li class="link">
                                            <a href="injectables/McpClientService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >McpClientService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/McpGatewayService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >McpGatewayService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/McpServerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >McpServerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-304c694d75e86649dd4f1cfb5f3ab0f5a77ff769065ff50d0cb757baa006c78662e1e737315b9ba0df4bf6b4994053100636f0632a414ddd058307541c0f26fe"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-304c694d75e86649dd4f1cfb5f3ab0f5a77ff769065ff50d0cb757baa006c78662e1e737315b9ba0df4bf6b4994053100636f0632a414ddd058307541c0f26fe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-304c694d75e86649dd4f1cfb5f3ab0f5a77ff769065ff50d0cb757baa006c78662e1e737315b9ba0df4bf6b4994053100636f0632a414ddd058307541c0f26fe"' :
                                            'id="xs-controllers-links-module-UsersModule-304c694d75e86649dd4f1cfb5f3ab0f5a77ff769065ff50d0cb757baa006c78662e1e737315b9ba0df4bf6b4994053100636f0632a414ddd058307541c0f26fe"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-304c694d75e86649dd4f1cfb5f3ab0f5a77ff769065ff50d0cb757baa006c78662e1e737315b9ba0df4bf6b4994053100636f0632a414ddd058307541c0f26fe"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-304c694d75e86649dd4f1cfb5f3ab0f5a77ff769065ff50d0cb757baa006c78662e1e737315b9ba0df4bf6b4994053100636f0632a414ddd058307541c0f26fe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-304c694d75e86649dd4f1cfb5f3ab0f5a77ff769065ff50d0cb757baa006c78662e1e737315b9ba0df4bf6b4994053100636f0632a414ddd058307541c0f26fe"' :
                                        'id="xs-injectables-links-module-UsersModule-304c694d75e86649dd4f1cfb5f3ab0f5a77ff769065ff50d0cb757baa006c78662e1e737315b9ba0df4bf6b4994053100636f0632a414ddd058307541c0f26fe"' }>
                                        <li class="link">
                                            <a href="injectables/CaslFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaslFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAuthGuard</a>
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
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAuthRegisterPayload.html" data-type="entity-link" >IAuthRegisterPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGenericMessageBody.html" data-type="entity-link" >IGenericMessageBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJWTResponseBody.html" data-type="entity-link" >IJWTResponseBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMessage.html" data-type="entity-link" >IMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPolicyHandler.html" data-type="entity-link" >IPolicyHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpChatMessage.html" data-type="entity-link" >McpChatMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpChatRequest.html" data-type="entity-link" >McpChatRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpChatResponse.html" data-type="entity-link" >McpChatResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpInventory.html" data-type="entity-link" >McpInventory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpPromptSummary.html" data-type="entity-link" >McpPromptSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpResourceSummary.html" data-type="entity-link" >McpResourceSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpServerInfo.html" data-type="entity-link" >McpServerInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpToolInvocationRequest.html" data-type="entity-link" >McpToolInvocationRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpToolInvocationResponse.html" data-type="entity-link" >McpToolInvocationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/McpToolSummary.html" data-type="entity-link" >McpToolSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RemoteConnection.html" data-type="entity-link" >RemoteConnection</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});