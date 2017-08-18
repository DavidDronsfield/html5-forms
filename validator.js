var formCtrl = (function() {

  var body = $('body');
  var form = body.find('form');
  var input = form.find('input');
  var username = form.find('#username');
  var regForm = body.find('.reg-form');
  
  var hasNoEmptyRequiredFields = function(el) {
    var requiredInputs = el.find('input:required');
    var emptyRequiredInputs = requiredInputs.filter(function() {
      return !this.value;
    });
    return emptyRequiredInputs.length === 0;
  }

  var hasNoErrors = function(el) {
    var invalidInputs = el.find('input.error')
    return invalidInputs.length === 0;
  }

  var checkFormValid = function(el) {
    return (hasNoErrors(el) && hasNoEmptyRequiredFields(el) );
  }

  return {

    toggleSubmittable: function() {
      form.on('change', input, function(event) {  // TODO: This is attached to the wrong event
        var el = $(this);
        var button =  el.find('button[type=submit]')
        var formValid = checkFormValid(el);
        formValid ? button.prop('disabled', false) :  button.prop('disabled', true);
      }
    )},

    // formatTel: function() {

    // },

    suggestUserName: function() {
      username.on('focus', function() { // TODO: Needs event delegation
        var el = $(this);
        var thisForm = el.parent('form');
        var firstName = thisForm.find('#firstname').val();
        var lastName = thisForm.find('#lastname').val();
        var userName = thisForm.find('#username').val()
        if(firstName && lastname && !userName) {
          username.val(firstName + '.' + lastName);
        }
      })
    },

    validate: function() {
      function textOnlyValidation(value, element) {
        return /^[a-zA-Z ]*$/.test(value);
      }

      $.validator.addMethod("textOnly", textOnlyValidation, 'Please enter only alpha characters( a-z ).');

      regForm.validate({
        rules: {
          firstname: {
            required: true,
            textOnly: true
          },
          lastname: {
            required: true,
            textOnly: true
          },
          email: {
            required: true,
            email: true
          },
          password: {
            required: true,
            minlength: 5
          },
          telephone: {
            required: true,
            digits: true
          }
        },
        messages: {
          firstname: {
            required: "Please enter your firstname"
          },
          lastname: {
            required: "Please enter your lastname"
          },
          password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
          },
          email: "Please enter a valid email address",
          telephone: "Please enter a valid telephone number"
        },
        submitHandler: function(form) {
          form.submit();
        }
      });
    }
  }

})();

$(document).ready(function() {

  if($('form')) {
    formCtrl.toggleSubmittable();
    formCtrl.validate();
    // formCtrl.formatTel();
    formCtrl.suggestUserName();
  }

});