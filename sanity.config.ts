import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'makko-billi-school',
  title: 'Makko Billi School CMS',
  projectId: 'yqwhfc1k',
  dataset: 'production',
  basePath: '/studio',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Pages Group
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Home Page')
                      .child(S.document().schemaType('homePage').documentId('homePage')),
                    S.listItem()
                      .title('About Page')
                      .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
                    S.listItem()
                      .title('Staff Page')
                      .child(S.document().schemaType('staffPage').documentId('staffPage')),
                    S.listItem()
                      .title('Gallery Page')
                      .child(S.document().schemaType('galleryPage').documentId('galleryPage')),
                    S.listItem()
                      .title('Contact Page')
                      .child(S.document().schemaType('contactPage').documentId('contactPage')),
                  ])
              ),
            
            S.divider(),
            
            // Site Settings
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            
            S.divider(),
            
            // Content Group
            S.listItem()
              .title('Posts & Media')
              .child(
                S.list()
                  .title('Posts & Media')
                  .items([
                    S.documentTypeListItem('socialPost').title('Social Posts'),
                    S.documentTypeListItem('galleryImage').title('Gallery Images'),
                  ])
              ),
            
            S.divider(),
            
            // About Content Group
            S.listItem()
              .title('About Content')
              .child(
                S.list()
                  .title('About Content')
                  .items([
                    S.documentTypeListItem('stat').title('Statistics'),
                    S.documentTypeListItem('facility').title('Facilities'),
                    S.documentTypeListItem('academicLevel').title('Academic Levels'),
                    S.documentTypeListItem('service').title('Services'),
                    S.documentTypeListItem('branch').title('Branches'),
                  ])
              ),
            
            S.divider(),
            
            // Staff Group
            S.listItem()
              .title('Staff & Departments')
              .child(
                S.list()
                  .title('Staff & Departments')
                  .items([
                    S.documentTypeListItem('staffProfile').title('Staff Profiles'),
                    S.documentTypeListItem('department').title('Departments'),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  document: {
    // Prevent creation of multiple singletons
    actions: (prev, context) => {
      const singletonTypes = ['homePage', 'aboutPage', 'staffPage', 'galleryPage', 'contactPage', 'siteSettings'];
      
      if (singletonTypes.includes(context.schemaType)) {
        return prev.filter(({ action }) => !['create', 'duplicate', 'delete'].includes(action || ''));
      }
      
      return prev;
    },
  },
});
