Polymer({
    is: 'can-file-io',
    properties: {
        apiRoute: {
            type: String,
            value: null
        },
        userId: {
            type: String,
            value: null
        },
        uploadData: {
            type: Object,
        },
        downloadData: {
            type: Object,
            value: null,
            notify: true
        },
        filename: {
            type: String,
            value: '',
            notify: true
        },
        selectButtonLabel: {
            type: String,
            value: 'upload bestand'
        },
        complete: {
            type: Boolean,
            notify: true,
            computed: '_isComplete(downloadData.dataURI)'
        },
        maximumFileSize: {
            type: Number,
            value: 5120,
            notify: true
        },
        method: {
            type: String,
            value: 'PUT'
        },
        disabledWarning: String,

        disabled: String
    },
    _handleFile: function() {
        var self = this;
        var file = this.$$('input[type=file]').files[0];
        var maximumFileSizeInBytes = this.maximumFileSize*1000;
        if(file.size > maximumFileSizeInBytes) return alert('Sorry, de maximale uploadbare grootte is '+ maximumFileSizeInBytes +' kilobytes.');
        var reader = new FileReader();
        reader.onloadend = function () {
            // var fileData;
            // if(file.type.match('image.*')) fileData = self._processImage(reader.result);
            // else fileData = reader.result;
            self._setUploadData(file.name, reader.result);
            self.$$('.upload-file').submit();
            self.set('downloadData', null);
        };
        reader.readAsDataURL(file);
    },
    _selectFile: function(evt) {
        evt.preventDefault();
        this.$$('#selectFile').click();
    },
    _setUploadData: function(fileName, fileData) {
        this.set('uploadData', {
            userId: this.userId,
            name: fileName.replace(/\s+/g, '_'),
            filedata: fileData
        });
    },
    _handleDownload: function(evt, data) {
        this.fire('downloaded', data);
    },
    _handleDownloadError: function(evt, error) {
        this.fire('download-failed', error);
    },
    _handleUpload: function(evt, data) {
        this.$$('#download-file').send();
        this.fire('uploaded', data);
    },
    _handleUploadError: function(evt, error) {
        this.fire('upload-failed', error);
    },
    _isComplete: function(dataURI) {
        return (!!dataURI);
    },
    _processImage: function(fileReaderData) {
        var img = document.createElement('img');
        img.src = fileReaderData;

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 2560;
        var MAX_HEIGHT = 2560;
        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        var dataurl = canvas.toDataURL('image/jpeg');
        return dataurl;
    }
});
