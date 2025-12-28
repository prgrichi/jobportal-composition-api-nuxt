<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-app mx-auto px-4">

      <div class="mb-14 text-center">
        <p class="text-sm uppercase tracking-wider text-primary-600">Tech Stack</p>
        <h2 class="mt-2 text-3xl font-semibold text-gray-900">
          Technologien hinter dem Projekt
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-gray-600">
          Dieses Jobportal ist als praxisnahes Portfolio-Projekt konzipiert.
          Der Stack fokussiert Wartbarkeit, Struktur und moderne Frontend-Workflows.
        </p>
      </div>

      <div class="rounded-l border border-gray-200 bg-white overflow-hidden">
        <div class="grid lg:grid-cols-2 lg:divide-x lg:divide-gray-200">

          <!-- Spalte links -->
          <div class="divide-y divide-gray-200">
            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
         bg-primary-100 text-xs font-mono font-medium text-primary-500">
                01
              </span>
              <div>
                <h3 class="text-lg font-medium">Vue 3</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Komponentenbasierte Architektur für eine klare UI-Struktur.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
         bg-primary-100 text-xs font-mono font-medium text-primary-600">
                02
              </span>
              <div>
                <h3 class="text-lg font-medium">Pinia</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Zentrales State Management für Jobs, Nutzer und Favoriten.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                03
              </span>
              <div>
                <h3 class="text-lg font-medium">Vue Router</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Clientseitiges Routing mit Guards für geschützte Bereiche.
                </p>
              </div>
            </div>
          </div>

          <!-- Spalte rechts -->
          <div class="divide-y divide-gray-200">
            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                04
              </span>
              <div>
                <h3 class="text-lg font-medium">Firebase</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Authentifizierung und Datenhaltung über Firestore.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                05
              </span>
              <div>
                <h3 class="text-lg font-medium">Vite</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Schnelles Development-Setup mit moderner Build-Pipeline.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                06
              </span>
              <div>
                <h3 class="text-lg font-medium">Tailwind CSS</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Utility-first Styling für ein konsistentes, responsives UI.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'TechStackSection',
}
</script>

<style scoped></style> 