import { CommonModule } from '@angular/common';
import { Injectable, NgZone, EventEmitter, Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, ViewChild, NgModule } from '@angular/core';
import { __spread, __assign } from 'tslib';
import { Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/script.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ScriptService = /** @class */ (function () {
    function ScriptService(zone) {
        this.zone = zone;
    }
    /**
     * @param {?} url
     * @param {?} globalVar
     * @param {?} onReady
     * @return {?}
     */
    ScriptService.prototype.registerScript = /**
     * @param {?} url
     * @param {?} globalVar
     * @param {?} onReady
     * @return {?}
     */
    function (url, globalVar, onReady) {
        var _this = this;
        /** @type {?} */
        var existingGlobalVar = ((/** @type {?} */ (window)))[globalVar];
        if (existingGlobalVar) {
            // global variable is present = script was already loaded
            this.zone.run((/**
             * @return {?}
             */
            function () {
                onReady(existingGlobalVar);
            }));
            return;
        }
        // prepare script elem
        /** @type {?} */
        var scriptElem = document.createElement('script');
        scriptElem.id = this.getElemId(globalVar);
        scriptElem.innerHTML = '';
        scriptElem.onload = (/**
         * @return {?}
         */
        function () {
            _this.zone.run((/**
             * @return {?}
             */
            function () {
                onReady(((/** @type {?} */ (window)))[globalVar]);
            }));
        });
        scriptElem.src = url;
        scriptElem.async = true;
        scriptElem.defer = true;
        // add script to header
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
    };
    /**
     * @param {?} globalVar
     * @return {?}
     */
    ScriptService.prototype.cleanup = /**
     * @param {?} globalVar
     * @return {?}
     */
    function (globalVar) {
        // remove script from DOM
        /** @type {?} */
        var scriptElem = document.getElementById(this.getElemId(globalVar));
        if (scriptElem) {
            scriptElem.remove();
        }
    };
    /**
     * @private
     * @param {?} globalVar
     * @return {?}
     */
    ScriptService.prototype.getElemId = /**
     * @private
     * @param {?} globalVar
     * @return {?}
     */
    function (globalVar) {
        return "ngx-paypal-script-elem-" + globalVar;
    };
    ScriptService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScriptService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ScriptService;
}());
if (false) {
    /**
     * @type {?}
     * @protected
     */
    ScriptService.prototype.zone;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/paypal-script.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PayPalScriptService = /** @class */ (function () {
    function PayPalScriptService(scriptService) {
        this.scriptService = scriptService;
        this.paypalWindowName = 'paypal';
    }
    /**
     * @param {?} config
     * @param {?} onReady
     * @return {?}
     */
    PayPalScriptService.prototype.registerPayPalScript = /**
     * @param {?} config
     * @param {?} onReady
     * @return {?}
     */
    function (config, onReady) {
        this.scriptService.registerScript(this.getUrlForConfig(config), this.paypalWindowName, onReady);
    };
    /**
     * @return {?}
     */
    PayPalScriptService.prototype.destroyPayPalScript = /**
     * @return {?}
     */
    function () {
        this.scriptService.cleanup(this.paypalWindowName);
    };
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    PayPalScriptService.prototype.getUrlForConfig = /**
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var params = [
            {
                name: 'client-id',
                value: config.clientId
            }
        ];
        if (config.currency) {
            params.push({
                name: 'currency',
                value: config.currency
            });
        }
        if (config.commit) {
            params.push({
                name: 'commit',
                value: config.commit
            });
        }
        if (config.vault) {
            params.push({
                name: 'vault',
                value: config.vault
            });
        }
        if (config.extraParams) {
            params.push.apply(params, __spread(config.extraParams));
        }
        return "https://www.paypal.com/sdk/js" + this.getQueryString(params);
    };
    /**
     * @private
     * @param {?} queryParams
     * @return {?}
     */
    PayPalScriptService.prototype.getQueryString = /**
     * @private
     * @param {?} queryParams
     * @return {?}
     */
    function (queryParams) {
        /** @type {?} */
        var queryString = '';
        for (var i = 0; i < queryParams.length; i++) {
            /** @type {?} */
            var queryParam = queryParams[i];
            if (i === 0) {
                queryString += '?';
            }
            else {
                queryString += '&';
            }
            queryString += queryParam.name + "=" + queryParam.value;
        }
        return queryString;
    };
    PayPalScriptService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PayPalScriptService.ctorParameters = function () { return [
        { type: ScriptService }
    ]; };
    return PayPalScriptService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    PayPalScriptService.prototype.paypalWindowName;
    /**
     * @type {?}
     * @protected
     */
    PayPalScriptService.prototype.scriptService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/paypal.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxPaypalComponent = /** @class */ (function () {
    function NgxPaypalComponent(paypalScriptService, cdr, ngZone) {
        this.paypalScriptService = paypalScriptService;
        this.cdr = cdr;
        this.ngZone = ngZone;
        /**
         * If enabled, paypal SDK script will be loaded. Useful if you want to have multiple PayPal components on the same page
         * sharing base configuration. In such a case only a single component may register script.
         */
        this.registerScript = true;
        /**
         * Emitted when paypal script is loaded
         */
        this.scriptLoaded = new EventEmitter();
        this.ngUnsubscribe = new Subject();
        /**
         * Flag that indicates if paypal should be initialized (required for handling script load events and availability of DOM element)
         */
        this.initializePayPal = true;
    }
    Object.defineProperty(NgxPaypalComponent.prototype, "payPalButtonContainer", {
        set: /**
         * @param {?} content
         * @return {?}
         */
        function (content) {
            this.payPalButtonContainerElem = content;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxPaypalComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (!this.payPalButtonContainerId) {
            this.payPalButtonContainerId = this.generateElementId();
        }
        // first time config setup
        /** @type {?} */
        var config = this.config;
        if (changes.config.isFirstChange()) {
            if (config && this.registerScript) {
                this.initPayPalScript(config, (/**
                 * @param {?} payPal
                 * @return {?}
                 */
                function (payPal) {
                    // store reference to paypal global script
                    _this.payPal = payPal;
                    _this.doPayPalCheck();
                }));
            }
        }
        // changes to config
        if (!changes.config.isFirstChange()) {
            this.reinitialize(config);
        }
    };
    /**
     * @return {?}
     */
    NgxPaypalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.paypalScriptService.destroyPayPalScript();
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    /**
     * @return {?}
     */
    NgxPaypalComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.doPayPalCheck();
    };
    /**
     * @param {?} payPal
     * @return {?}
     */
    NgxPaypalComponent.prototype.customInit = /**
     * @param {?} payPal
     * @return {?}
     */
    function (payPal) {
        this.payPal = payPal;
        this.doPayPalCheck();
    };
    /**
     * @param {?} config
     * @return {?}
     */
    NgxPaypalComponent.prototype.reinitialize = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        this.config = config;
        this.payPal = undefined;
        this.paypalScriptService.destroyPayPalScript();
        this.payPalButtonContainerId = this.generateElementId();
        this.initializePayPal = true;
        if (this.payPalButtonContainerElem) {
            while (this.payPalButtonContainerElem.nativeElement.firstChild) {
                this.payPalButtonContainerElem.nativeElement.removeChild(this.payPalButtonContainerElem.nativeElement.firstChild);
            }
        }
        this.cdr.detectChanges();
        if (this.config) {
            if (!this.payPal) {
                this.initPayPalScript(this.config, (/**
                 * @param {?} payPal
                 * @return {?}
                 */
                function (payPal) {
                    // store reference to paypal global script
                    _this.payPal = payPal;
                    _this.doPayPalCheck();
                }));
            }
            else {
                this.doPayPalCheck();
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxPaypalComponent.prototype.doPayPalCheck = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.initializePayPal && this.config && this.payPal && this.payPalButtonContainerElem) {
            // make sure that id is also set
            if (this.payPalButtonContainerElem.nativeElement.id) {
                this.initializePayPal = false;
                this.initPayPal(this.config, this.payPal);
            }
        }
    };
    /**
     * @private
     * @param {?} config
     * @param {?} initPayPal
     * @return {?}
     */
    NgxPaypalComponent.prototype.initPayPalScript = /**
     * @private
     * @param {?} config
     * @param {?} initPayPal
     * @return {?}
     */
    function (config, initPayPal) {
        var _this = this;
        this.paypalScriptService.registerPayPalScript({
            clientId: config.clientId,
            commit: config.advanced && config.advanced.commit ? config.advanced.commit : undefined,
            currency: config.currency,
            vault: config.vault,
            extraParams: config.advanced && config.advanced.extraQueryParams ? config.advanced.extraQueryParams : []
        }, (/**
         * @param {?} paypal
         * @return {?}
         */
        function (paypal) {
            _this.scriptLoaded.next(paypal);
            initPayPal(paypal);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NgxPaypalComponent.prototype.generateElementId = /**
     * @private
     * @return {?}
     */
    function () {
        return "ngx-captcha-id-" + new Date().valueOf();
    };
    /**
     * @private
     * @param {?} config
     * @param {?} paypal
     * @return {?}
     */
    NgxPaypalComponent.prototype.initPayPal = /**
     * @private
     * @param {?} config
     * @param {?} paypal
     * @return {?}
     */
    function (config, paypal) {
        var _this = this;
        // Running outside angular zone prevents infinite ngDoCheck lifecycle calls
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            // https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page
            /** @type {?} */
            var createOrder = (/**
             * @param {?} data
             * @param {?} actions
             * @return {?}
             */
            function (data, actions) {
                return _this.ngZone.run((/**
                 * @return {?}
                 */
                function () {
                    if (config.createOrderOnClient && config.createOrderOnServer) {
                        throw Error("Both 'createOrderOnClient' and 'createOrderOnServer' are defined.\n                    Please choose one or the other.");
                    }
                    if (!config.createOrderOnClient && !config.createOrderOnServer) {
                        throw Error("Neither 'createOrderOnClient' or 'createOrderOnServer' are defined.\n                    Please define one of these to create order.");
                    }
                    if (config.createOrderOnClient) {
                        return actions.order.create(config.createOrderOnClient(data));
                    }
                    if (config.createOrderOnServer) {
                        return config.createOrderOnServer(data);
                    }
                    throw Error("Invalid state for 'createOrder'.");
                }));
            });
            /** @type {?} */
            var createSubscription = (/**
             * @param {?} data
             * @param {?} actions
             * @return {?}
             */
            function (data, actions) {
                return _this.ngZone.run((/**
                 * @return {?}
                 */
                function () {
                    if (config.createSubscription) {
                        return config.createSubscription(data, actions);
                    }
                }));
            });
            /** @type {?} */
            var onShippingChange = (/**
             * @param {?} data
             * @param {?} actions
             * @return {?}
             */
            function (data, actions) {
                return _this.ngZone.run((/**
                 * @return {?}
                 */
                function () {
                    if (config.onShippingChange) {
                        return config.onShippingChange(data, actions);
                    }
                }));
            });
            /** @type {?} */
            var buttonsConfig = __assign(__assign(__assign({ style: config.style, onApprove: (/**
                 * @param {?} data
                 * @param {?} actions
                 * @return {?}
                 */
                function (data, actions) {
                    return _this.ngZone.run((/**
                     * @return {?}
                     */
                    function () {
                        if (config.onApprove) {
                            config.onApprove(data, actions);
                        }
                        // capture on server
                        if (config.authorizeOnServer) {
                            return config.authorizeOnServer(data, actions);
                        }
                        // capture on client
                        /** @type {?} */
                        var onClientAuthorization = config.onClientAuthorization;
                        if (onClientAuthorization) {
                            actions.order.capture().then((/**
                             * @param {?} details
                             * @return {?}
                             */
                            function (details) {
                                _this.ngZone.run((/**
                                 * @return {?}
                                 */
                                function () {
                                    onClientAuthorization(details);
                                }));
                            }));
                            return;
                        }
                    }));
                }), onError: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.ngZone.run((/**
                     * @return {?}
                     */
                    function () {
                        if (config.onError) {
                            config.onError(error);
                        }
                    }));
                }), onCancel: (/**
                 * @param {?} data
                 * @param {?} actions
                 * @return {?}
                 */
                function (data, actions) {
                    _this.ngZone.run((/**
                     * @return {?}
                     */
                    function () {
                        if (config.onCancel) {
                            config.onCancel(data, actions);
                        }
                    }));
                }), onClick: (/**
                 * @param {?} data
                 * @param {?} actions
                 * @return {?}
                 */
                function (data, actions) {
                    _this.ngZone.run((/**
                     * @return {?}
                     */
                    function () {
                        if (config.onClick) {
                            config.onClick(data, actions);
                        }
                    }));
                }), onInit: (/**
                 * @param {?} data
                 * @param {?} actions
                 * @return {?}
                 */
                function (data, actions) {
                    _this.ngZone.run((/**
                     * @return {?}
                     */
                    function () {
                        if (config.onInit) {
                            config.onInit(data, actions);
                        }
                    }));
                }) }, ((config.createOrderOnClient || config.createOrderOnServer) && { createOrder: createOrder })), (config.createSubscription && { createSubscription: createSubscription })), (config.onShippingChange && { onShippingChange: onShippingChange }));
            paypal.Buttons(buttonsConfig).render("#" + _this.payPalButtonContainerId);
        }));
    };
    NgxPaypalComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'ngx-paypal',
                    template: "\n    <div #payPalButtonContainer [id]=\"payPalButtonContainerId\"></div>\n    "
                }] }
    ];
    /** @nocollapse */
    NgxPaypalComponent.ctorParameters = function () { return [
        { type: PayPalScriptService },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    NgxPaypalComponent.propDecorators = {
        config: [{ type: Input }],
        registerScript: [{ type: Input }],
        scriptLoaded: [{ type: Output }],
        payPalButtonContainer: [{ type: ViewChild, args: ['payPalButtonContainer', { static: false },] }]
    };
    return NgxPaypalComponent;
}());
if (false) {
    /**
     * Configuration for paypal.
     * @type {?}
     */
    NgxPaypalComponent.prototype.config;
    /**
     * If enabled, paypal SDK script will be loaded. Useful if you want to have multiple PayPal components on the same page
     * sharing base configuration. In such a case only a single component may register script.
     * @type {?}
     */
    NgxPaypalComponent.prototype.registerScript;
    /**
     * Emitted when paypal script is loaded
     * @type {?}
     */
    NgxPaypalComponent.prototype.scriptLoaded;
    /**
     * Id of the element where PayPal button will be rendered
     * @type {?}
     */
    NgxPaypalComponent.prototype.payPalButtonContainerId;
    /**
     * @type {?}
     * @private
     */
    NgxPaypalComponent.prototype.ngUnsubscribe;
    /**
     * @type {?}
     * @private
     */
    NgxPaypalComponent.prototype.payPalButtonContainerElem;
    /**
     * Flag that indicates if paypal should be initialized (required for handling script load events and availability of DOM element)
     * @type {?}
     * @private
     */
    NgxPaypalComponent.prototype.initializePayPal;
    /**
     * Reference to PayPal global API
     * @type {?}
     * @private
     */
    NgxPaypalComponent.prototype.payPal;
    /**
     * @type {?}
     * @private
     */
    NgxPaypalComponent.prototype.paypalScriptService;
    /**
     * @type {?}
     * @private
     */
    NgxPaypalComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NgxPaypalComponent.prototype.ngZone;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-paypal.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxPayPalModule = /** @class */ (function () {
    function NgxPayPalModule() {
    }
    NgxPayPalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NgxPaypalComponent,
                    ],
                    exports: [
                        NgxPaypalComponent,
                    ],
                    providers: [
                        ScriptService,
                        PayPalScriptService
                    ]
                },] }
    ];
    return NgxPayPalModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/paypal-models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayPalConfig() { }
if (false) {
    /**
     * Currency - Defaults to USD if not provided
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.currency;
    /**
     * Use when creating order on client
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.createOrderOnClient;
    /**
     * Use for creating orders on server. PayPal expects you to return 'orderId' in this method
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.createOrderOnServer;
    /**
     * Advanced configuration
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.advanced;
    /**
     * Client id
     * @type {?}
     */
    IPayPalConfig.prototype.clientId;
    /**
     * Shipping callback
     * see https://developer.paypal.com/docs/checkout/integration-features/shipping-callback/
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.onShippingChange;
    /**
     * Called when 'onApprove' event occurs
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.onApprove;
    /**
     * Called when authorization on client succeeds
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.onClientAuthorization;
    /**
     * Implement for authorizing on server side
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.authorizeOnServer;
    /**
     * Button style configuration
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.style;
    /**
     * Error handler
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.onError;
    /**
     * Click handler
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.onClick;
    /**
     * Cancel handler
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.onCancel;
    /**
     * Init handler.
     * can be used for validation, see: https://developer.paypal.com/docs/checkout/integration-features/validation/#
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.onInit;
    /**
     * Create subscription handler
     * https://developer.paypal.com/docs/subscriptions/integrate/
     *
     * Note: the vault property in the advanced configuration also has to be set to true
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.createSubscription;
    /**
     * Vault - must be set to true when creating subscriptions
     * @type {?|undefined}
     */
    IPayPalConfig.prototype.vault;
}
/**
 * @record
 */
function IPayPalUrlConfig() { }
if (false) {
    /** @type {?} */
    IPayPalUrlConfig.prototype.clientId;
    /** @type {?|undefined} */
    IPayPalUrlConfig.prototype.currency;
    /** @type {?|undefined} */
    IPayPalUrlConfig.prototype.commit;
    /** @type {?|undefined} */
    IPayPalUrlConfig.prototype.vault;
    /** @type {?|undefined} */
    IPayPalUrlConfig.prototype.extraParams;
}
/**
 * @record
 */
function IOrderDetails() { }
if (false) {
    /** @type {?} */
    IOrderDetails.prototype.create_time;
    /** @type {?} */
    IOrderDetails.prototype.update_time;
    /** @type {?} */
    IOrderDetails.prototype.id;
    /** @type {?} */
    IOrderDetails.prototype.intent;
    /** @type {?} */
    IOrderDetails.prototype.payer;
    /** @type {?} */
    IOrderDetails.prototype.status;
    /** @type {?} */
    IOrderDetails.prototype.links;
    /** @type {?} */
    IOrderDetails.prototype.purchase_units;
}
/**
 * @record
 */
function IClientAuthorizeCallbackData() { }
if (false) {
    /** @type {?} */
    IClientAuthorizeCallbackData.prototype.links;
}
/**
 * @record
 */
function ILinkDescription() { }
if (false) {
    /** @type {?} */
    ILinkDescription.prototype.href;
    /** @type {?} */
    ILinkDescription.prototype.rel;
    /** @type {?|undefined} */
    ILinkDescription.prototype.method;
}
/**
 * @record
 */
function IQueryParam() { }
if (false) {
    /** @type {?} */
    IQueryParam.prototype.name;
    /** @type {?} */
    IQueryParam.prototype.value;
}
/**
 * @record
 */
function IOnShippingChangeData() { }
if (false) {
    /** @type {?} */
    IOnShippingChangeData.prototype.paymentToken;
    /** @type {?} */
    IOnShippingChangeData.prototype.shipping_address;
    /** @type {?|undefined} */
    IOnShippingChangeData.prototype.selected_shipping_method;
}
/**
 * @record
 */
function IOnShippingChangeActions() { }
if (false) {
    /** @type {?} */
    IOnShippingChangeActions.prototype.resolve;
    /** @type {?} */
    IOnShippingChangeActions.prototype.reject;
    /** @type {?} */
    IOnShippingChangeActions.prototype.patch;
}
/**
 * @record
 */
function IAdvancedConfiguration() { }
if (false) {
    /** @type {?|undefined} */
    IAdvancedConfiguration.prototype.commit;
    /** @type {?|undefined} */
    IAdvancedConfiguration.prototype.extraQueryParams;
}
/**
 * @record
 */
function IOnApproveCallbackData() { }
if (false) {
    /** @type {?} */
    IOnApproveCallbackData.prototype.orderID;
    /** @type {?} */
    IOnApproveCallbackData.prototype.payerID;
    /** @type {?} */
    IOnApproveCallbackData.prototype.subscriptionID;
}
/**
 * @record
 */
function ICreateOrderCallbackActions() { }
if (false) {
    /** @type {?} */
    ICreateOrderCallbackActions.prototype.order;
}
/**
 * @record
 */
function ICancelCallbackData() { }
if (false) {
    /** @type {?} */
    ICancelCallbackData.prototype.orderID;
}
/**
 * @record
 */
function IOnApproveCallbackActions() { }
if (false) {
    /** @type {?} */
    IOnApproveCallbackActions.prototype.redirect;
    /** @type {?} */
    IOnApproveCallbackActions.prototype.restart;
    /** @type {?} */
    IOnApproveCallbackActions.prototype.order;
}
/**
 * @record
 */
function IOnInitCallbackActions() { }
if (false) {
    /** @type {?} */
    IOnInitCallbackActions.prototype.enable;
    /** @type {?} */
    IOnInitCallbackActions.prototype.disable;
}
/**
 * @record
 */
function ICreateSubscriptionCallbackActions() { }
if (false) {
    /** @type {?} */
    ICreateSubscriptionCallbackActions.prototype.subscription;
}
/**
 * @record
 */
function IInitCallbackData() { }
/**
 * @record
 */
function ICreateSubscriptionCallbackData() { }
/**
 * @record
 */
function IOnClickCallbackActions() { }
if (false) {
    /** @type {?} */
    IOnClickCallbackActions.prototype.resolve;
    /** @type {?} */
    IOnClickCallbackActions.prototype.reject;
}
/**
 * @record
 */
function IPayPalButtonStyle() { }
if (false) {
    /** @type {?|undefined} */
    IPayPalButtonStyle.prototype.label;
    /** @type {?|undefined} */
    IPayPalButtonStyle.prototype.size;
    /** @type {?|undefined} */
    IPayPalButtonStyle.prototype.shape;
    /** @type {?|undefined} */
    IPayPalButtonStyle.prototype.color;
    /** @type {?|undefined} */
    IPayPalButtonStyle.prototype.layout;
    /** @type {?|undefined} */
    IPayPalButtonStyle.prototype.tagline;
}
/**
 * @record
 */
function ICreateOrderRequest() { }
if (false) {
    /** @type {?} */
    ICreateOrderRequest.prototype.intent;
    /** @type {?} */
    ICreateOrderRequest.prototype.purchase_units;
    /** @type {?|undefined} */
    ICreateOrderRequest.prototype.payer;
    /** @type {?|undefined} */
    ICreateOrderRequest.prototype.application_context;
}
/**
 * @record
 */
function ICreateSubscriptionRequest() { }
if (false) {
    /** @type {?} */
    ICreateSubscriptionRequest.prototype.plan_id;
}
/**
 * @record
 */
function IPayer() { }
if (false) {
    /** @type {?|undefined} */
    IPayer.prototype.name;
    /** @type {?|undefined} */
    IPayer.prototype.email_address;
    /** @type {?|undefined} */
    IPayer.prototype.payer_id;
    /** @type {?|undefined} */
    IPayer.prototype.birth_date;
    /** @type {?|undefined} */
    IPayer.prototype.tax_info;
    /** @type {?|undefined} */
    IPayer.prototype.address;
}
/**
 * @record
 */
function IApplicationContext() { }
if (false) {
    /** @type {?|undefined} */
    IApplicationContext.prototype.brand_name;
    /** @type {?|undefined} */
    IApplicationContext.prototype.locale;
    /** @type {?|undefined} */
    IApplicationContext.prototype.landing_page;
    /** @type {?|undefined} */
    IApplicationContext.prototype.shipping_preference;
    /** @type {?|undefined} */
    IApplicationContext.prototype.user_action;
    /** @type {?|undefined} */
    IApplicationContext.prototype.payment_method;
    /** @type {?|undefined} */
    IApplicationContext.prototype.return_url;
    /** @type {?|undefined} */
    IApplicationContext.prototype.cancel_url;
}
/**
 * @record
 */
function IPaymentMethod() { }
if (false) {
    /** @type {?|undefined} */
    IPaymentMethod.prototype.payer_selected;
    /** @type {?|undefined} */
    IPaymentMethod.prototype.payee_preferred;
}
/**
 * @record
 */
function IPhone() { }
if (false) {
    /** @type {?|undefined} */
    IPhone.prototype.phone_type;
    /** @type {?|undefined} */
    IPhone.prototype.phone_number;
}
/**
 * @record
 */
function ITaxInfo() { }
if (false) {
    /** @type {?} */
    ITaxInfo.prototype.tax_id;
    /** @type {?} */
    ITaxInfo.prototype.tax_id_type;
}
/**
 * @record
 */
function IPhoneNumber() { }
if (false) {
    /** @type {?} */
    IPhoneNumber.prototype.national_number;
}
/**
 * @record
 */
function IPurchaseUnit() { }
if (false) {
    /** @type {?} */
    IPurchaseUnit.prototype.amount;
    /** @type {?|undefined} */
    IPurchaseUnit.prototype.reference_id;
    /** @type {?|undefined} */
    IPurchaseUnit.prototype.payee;
    /** @type {?|undefined} */
    IPurchaseUnit.prototype.payment_instruction;
    /** @type {?|undefined} */
    IPurchaseUnit.prototype.description;
    /** @type {?|undefined} */
    IPurchaseUnit.prototype.custom_id;
    /** @type {?|undefined} */
    IPurchaseUnit.prototype.invoice_id;
    /** @type {?|undefined} */
    IPurchaseUnit.prototype.soft_descriptor;
    /** @type {?} */
    IPurchaseUnit.prototype.items;
    /** @type {?|undefined} */
    IPurchaseUnit.prototype.shipping;
}
/**
 * @record
 */
function IPayee() { }
if (false) {
    /** @type {?|undefined} */
    IPayee.prototype.email_address;
    /** @type {?|undefined} */
    IPayee.prototype.merchant_id;
}
/**
 * @record
 */
function IPaymentInstructions() { }
if (false) {
    /** @type {?|undefined} */
    IPaymentInstructions.prototype.platform_fees;
    /** @type {?|undefined} */
    IPaymentInstructions.prototype.disbursement_mode;
}
/**
 * @record
 */
function IPlatformFee() { }
if (false) {
    /** @type {?} */
    IPlatformFee.prototype.amount;
    /** @type {?|undefined} */
    IPlatformFee.prototype.payee;
}
/**
 * @record
 */
function ITransactionItem() { }
if (false) {
    /** @type {?} */
    ITransactionItem.prototype.name;
    /** @type {?} */
    ITransactionItem.prototype.unit_amount;
    /** @type {?} */
    ITransactionItem.prototype.quantity;
    /** @type {?|undefined} */
    ITransactionItem.prototype.description;
    /** @type {?|undefined} */
    ITransactionItem.prototype.sku;
    /** @type {?|undefined} */
    ITransactionItem.prototype.category;
    /** @type {?|undefined} */
    ITransactionItem.prototype.tax;
}
/**
 * @record
 */
function ITax() { }
if (false) {
    /** @type {?} */
    ITax.prototype.currency_code;
    /** @type {?} */
    ITax.prototype.value;
}
/**
 * @record
 */
function IUnitAmount() { }
if (false) {
    /** @type {?} */
    IUnitAmount.prototype.currency_code;
    /** @type {?} */
    IUnitAmount.prototype.value;
    /** @type {?|undefined} */
    IUnitAmount.prototype.breakdown;
}
/**
 * @record
 */
function IMoney() { }
if (false) {
    /** @type {?} */
    IMoney.prototype.currency_code;
    /** @type {?} */
    IMoney.prototype.value;
}
/**
 * @record
 */
function IUnitBreakdown() { }
if (false) {
    /** @type {?|undefined} */
    IUnitBreakdown.prototype.item_total;
    /** @type {?|undefined} */
    IUnitBreakdown.prototype.shipping;
    /** @type {?|undefined} */
    IUnitBreakdown.prototype.handling;
    /** @type {?|undefined} */
    IUnitBreakdown.prototype.tax_total;
    /** @type {?|undefined} */
    IUnitBreakdown.prototype.insurance;
    /** @type {?|undefined} */
    IUnitBreakdown.prototype.shipping_discount;
    /** @type {?|undefined} */
    IUnitBreakdown.prototype.discount;
}
/**
 * @record
 */
function IPartyName() { }
if (false) {
    /** @type {?|undefined} */
    IPartyName.prototype.prefix;
    /** @type {?|undefined} */
    IPartyName.prototype.given_name;
    /** @type {?|undefined} */
    IPartyName.prototype.surname;
    /** @type {?|undefined} */
    IPartyName.prototype.middle_name;
    /** @type {?|undefined} */
    IPartyName.prototype.suffix;
    /** @type {?|undefined} */
    IPartyName.prototype.alternate_full_name;
    /** @type {?|undefined} */
    IPartyName.prototype.full_name;
}
/**
 * @record
 */
function IAddressPortable() { }
if (false) {
    /** @type {?} */
    IAddressPortable.prototype.country_code;
    /** @type {?|undefined} */
    IAddressPortable.prototype.address_line_1;
    /** @type {?|undefined} */
    IAddressPortable.prototype.address_line_2;
    /** @type {?|undefined} */
    IAddressPortable.prototype.admin_area_2;
    /** @type {?|undefined} */
    IAddressPortable.prototype.admin_area_1;
    /** @type {?|undefined} */
    IAddressPortable.prototype.postal_code;
}
/**
 * @record
 */
function IShipping() { }
if (false) {
    /** @type {?|undefined} */
    IShipping.prototype.name;
    /** @type {?|undefined} */
    IShipping.prototype.address;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-paypal.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxPayPalModule, NgxPaypalComponent, PayPalScriptService, ScriptService as ɵa };
//# sourceMappingURL=ngx-paypal.js.map
