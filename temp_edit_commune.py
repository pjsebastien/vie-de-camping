#!/usr/bin/env python3
import re

file_path = r"c:\Users\pjseb\OneDrive\Desktop\viedecamping\app\campings\commune\[commune]\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the "Liste des campings" section
# We'll match from the comment to the closing </section> before "À propos de la commune"

pattern = r'(      {/\* Liste des campings \*/}\s*<section.*?)\s*</section>\s*(?=\s*{/\* À propos de la commune \*/})'

replacement = '''      {/* Meilleurs campings */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center'
            }}>
              {bestCampingsContent.title}
            </h2>

            <p style={{
              fontSize: 'var(--text-lg)',
              lineHeight: '1.7',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--space-6)'
            }}>
              {bestCampingsContent.introduction}
            </p>

            {bestCampingsContent.criteria.length > 0 && (
              <div style={{
                backgroundColor: '#f0f7ff',
                border: '2px solid #003580',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-6)'
              }}>
                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-bold)',
                  color: '#003580',
                  marginBottom: 'var(--space-4)'
                }}>
                  🎯 Points clés de la sélection
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: 'var(--space-3)'
                }}>
                  {bestCampingsContent.criteria.map((criterion, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      gap: 'var(--space-3)',
                      fontSize: 'var(--text-base)',
                      lineHeight: '1.6',
                      color: 'var(--color-gray-700)'
                    }}>
                      <span style={{
                        color: '#2c5f2d',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-bold)',
                        flexShrink: 0
                      }}>✓</span>
                      <span>{criterion.replace(/\\*\\*/g, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: '1.7',
              color: 'var(--color-gray-700)'
            }}>
              {bestCampingsContent.conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* Comment choisir */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center'
            }}>
              💡 Comment choisir votre camping à {commune}
            </h2>

            <div style={{
              display: 'grid',
              gap: 'var(--space-4)'
            }}>
              {choosingTips.map((tip, index) => (
                <div key={index} style={{
                  backgroundColor: 'var(--color-white)',
                  borderLeft: '4px solid #003580',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-5)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: 'var(--space-3)',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      backgroundColor: '#003580',
                      color: 'var(--color-white)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'var(--font-bold)',
                      fontSize: 'var(--text-base)',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <p style={{
                      fontSize: 'var(--text-base)',
                      lineHeight: '1.6',
                      color: 'var(--color-gray-700)',
                      margin: 0
                    }}>
                      {tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste des campings avec filtre */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-gray-900)',
            marginBottom: 'var(--space-8)',
            textAlign: 'center'
          }}>
            Liste des campings à {commune}
          </h2>

          <CampingFilterWrapper campings={campings} commune={commune} />
        </div>
      </section>'''

# Use DOTALL flag to match across newlines
new_content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)

if new_content != content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("File updated successfully!")
else:
    print("No changes made - pattern not found")
