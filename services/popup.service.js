function PopupService($ionicPopup ) {

    this.popupList = {}
    this.popupName = [];
    var popupImgs= {
        success: {
            generic: "popUpGenerics/successGeneric.svg"
        },
        warning: {
            generic: "popUpGenerics/warningGeneric.svg"
        }
    }

    this.clearPopups = function(popupService){
        popupService = popupService == null ? this : popupService
        for(var n = 0; n < popupService.popupName.length; n++){
            popupService.closePopUp(popupService.popupName[n]);
        }
    }

    this.openPopUp = function (templateName, scope) {
        if (this.popupList.hasOwnProperty(templateName) == false) {
            this.popupName.push(templateName);
            this.popupList[templateName] = $ionicPopup.show({
                scope: scope,
                templateUrl: 'templates/pop-up/' + templateName + '.html',
                

                buttons: [{
                    text: '<i class="icon ion-close-circled"></i>',
                    type: 'popupStyle',
                    onTap: function (e) {
        
                    }
                }
                ]

            });
        }
    };

    this.closePopUp = function (templateName) {
        // console.log("[ closePopUp ] : Called")
        $(".blurable").removeClass("storigin-blur");

        if (this.popupList.hasOwnProperty(templateName)) {
            this.popupName.splice(this.popupName.indexOf(templateName),1);
            this.popupList[templateName].close();
            delete this.popupList[templateName];
        }
    };

    this.closePopUps = function (templateNames) {
        (templateNames).forEach(function(element){
            this.closePopUp(element);
        });
    }
     this.openSuccessPopUps = function (successNames, scope) {
         this.openPopUp("generic-success", scope);
     };
     this.openSuccessPopUp = function (successName, scope, imgName) {
         imgName = "generic";
         this.openPopUp("generic-success", scope);
     };

     this.openWarningPopUp = function (warningName, scope, imgName, error) {
         imgName = "generic";
         scope["popupWordWarn"] = {}
         this.openPopUp("generic-warning", scope);
     }
};
