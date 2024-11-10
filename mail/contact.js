$(function () {
  // Inisialisasi EmailJS
  emailjs.init("jL-nFhAZuFnTfj28g"); // Gantilah dengan User ID dari akun EmailJS Anda

  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // Penanganan kesalahan validasi di sini
    },
    submitSuccess: function ($form, event) {
      event.preventDefault();

      // Ambil nilai dari form
      var name = $("input#name").val();
      var email = $("input#email").val();
      var subject = $("input#subject").val();
      var message = $("textarea#message").val();

      // Menampilkan spinner atau menonaktifkan tombol saat pengiriman dimulai
      $this = $("#sendMessageButton");
      $this.prop("disabled", true);

      // Kirim email menggunakan EmailJS
      emailjs
        .send("service_ltrt42i", "template_jdwhqu6", {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        })
        .then(
          function (response) {
            // Tampilkan pesan sukses
            $("#success").html("<div class='alert alert-success'>");
            $("#success > .alert-success")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-success").append(
              "<strong>Your message has been sent. </strong>"
            );
            $("#success > .alert-success").append("</div>");

            // Reset form
            $("#contactForm").trigger("reset");
          },
          function (error) {
            // Tampilkan pesan error
            $("#success").html("<div class='alert alert-danger'>");
            $("#success > .alert-danger")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-danger").append(
              $("<strong>").text(
                "Sorry " +
                  name +
                  ", it seems that our mail server is not responding. Please try again later!"
              )
            );
            $("#success > .alert-danger").append("</div>");

            // Reset form
            $("#contactForm").trigger("reset");
          }
        )
        .finally(function () {
          // Aktifkan kembali tombol setelah pengiriman
          setTimeout(function () {
            $this.prop("disabled", false);
          }, 1000);
        });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  // Fokus pada nama untuk menghapus pesan kesuksesan/error
  $("#name").focus(function () {
    $("#success").html("");
  });
});
