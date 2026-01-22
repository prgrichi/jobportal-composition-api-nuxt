<template>
  <component
    v-for="section in sections"
    :key="section.id"
    :is="componentMap[section.__typename]"
    v-bind="section"
  />
</template>

<script setup>
definePageMeta({
  name: 'home',
  title: 'Home',
});
import { useI18n } from 'vue-i18n';
import { sectionRegistry } from '../lib/sectionRegistry';
import { usePageQuery } from '~/lib/usePageQuery';
import { HOME_PAGE_QUERY } from '~/graphql';

const { locale } = useI18n();
const hygraphLocale = computed(() => (locale.value === 'de' ? 'de' : 'en'));

const { data } = await usePageQuery('home', HOME_PAGE_QUERY, hygraphLocale);

const sections = computed(() => data.value?.page?.sections ?? []);

const componentMap = sectionRegistry;
</script>

<style scoped></style>
