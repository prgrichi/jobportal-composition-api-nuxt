<template>
  <section class="py-12 md:py-20">
    <div class="max-w-app mx-auto px-4">

      <div class="grid gap-12 md:grid-cols-2 lg:items-start">

        <!-- Text-Spalte -->
        <div>
          <p class="text-sm uppercase tracking-wider text-primary-600">
            Warum dieses Portal?
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-neutral-900">
            Reduziert auf das Wesentliche
          </h2>
          <p class="mt-4 max-w-prose text-neutral-600 leading-relaxed">
            Dieses Jobportal ist bewusst schlank gehalten: Stellen schnell finden,
            filtern und speichern – ohne Werbung, Popups oder visuelles Rauschen.
            Der Fokus liegt auf Struktur, Nutzerführung und klaren Inhalten.
          </p>
        </div>

        <!-- Liste -->
        <div class="rounded-xl border border-neutral-200 bg-white divide-y divide-neutral-200">
          <div class="p-6 md:p-7">
            <h3 class="font-medium text-neutral-900">
              Relevante Stellen
            </h3>
            <p class="mt-2 text-sm text-neutral-600">
              Ausgewählte Jobs aus internen Teams – keine Projektakquise oder Agenturangebote.
            </p>
          </div>

          <div class="p-6 md:p-7">
            <h3 class="font-medium text-neutral-900">
              Remote & flexibel
            </h3>
            <p class="mt-2 text-sm text-neutral-600">
              Remote- und Hybrid-Optionen sind klar gekennzeichnet.
            </p>
          </div>

          <div class="p-6 md:p-7">
            <h3 class="font-medium text-neutral-900">
              Ohne Ablenkung
            </h3>
            <p class="mt-2 text-sm text-neutral-600">
              Keine Werbung, kein Tracking, keine unnötigen Elemente.
            </p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'WhySection',
}
</script>

<style scoped></style>