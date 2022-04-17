$(document).ready(function () {
    var $imageElement = $('#img_el');
    var $fileInput = $('#file_input');
    var $addImgBtn = $('#add_image_btn');
    var $removeImgBtn = $('#remove_image_btn');
    var $submitBtn = $('#submit_btn');

    $addImgBtn.click(function () {
        $fileInput.trigger('click');
    });

    $removeImgBtn.click(function () {
        $fileInput.val(null);
        $imageElement.attr('src', "img/temp.png");
        $removeImgBtn.prop('disabled', true);
        $submitBtn.prop('disabled', true);
        $addImgBtn.prop('disabled', false);
    });

    $fileInput.change(function (e) {

        var file = e.target.files[0];

        if (file) {
            $imageElement.attr('src', URL.createObjectURL(file));
            $addImgBtn.prop('disabled', true);
            $removeImgBtn.prop('disabled', false);
            $submitBtn.prop('disabled', false);
        }
    });

});