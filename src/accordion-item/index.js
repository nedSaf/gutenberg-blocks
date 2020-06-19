/**
 * External dependencies
 */
import React from 'react'
import { components, editor, element, i18n } from 'wp'
/**
 * Internal dependencies
 */
import './style.scss'


const { Fragment } = element
const { __ } = i18n

const { PanelBody, ToggleControl } = components
const { BlockControls, RichText, AlignmentToolbar, InnerBlocks, InspectorControls } = editor

export const name = 'accordion-item'

const ALLOWED_BLOCKS = [ 'core/image', 'core/paragraph', 'coliquio/image' ];

export const settings = {
  title: __('Accordion Item'),

  description: __('A custom Accordion block for Gutenberg Cloud'),

  icon: 'editor-insertmore',

  attributes: {
    title: {
      type: 'string',
    },
    isOpen: {
      type: 'boolean',
		  default: false,
    }
  },

  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <BlockControls key="controls">
          <AlignmentToolbar
            value={ attributes.accordionAlignment }
            onChange={ ( value ) =>
              setAttributes( {
                accordionAlignment: value,
              } )
            }
          />
        </BlockControls>
        
        <InspectorControls key="inspector">
          <PanelBody>
            <ToggleControl
              label={ __( 'Open by default', 'atomic-blocks' ) }
              checked={ attributes.isOpen }
              onChange={ () =>
                setAttributes( {
                  isOpen: ! attributes.isOpen,
                } )
              }
            />
          </PanelBody>
        </InspectorControls>
        <RichText
          tagName="p"
          placeholder={ __( 'Accordion Title' ) }
          value={ attributes.title }
          className=""
          onChange={ ( value ) =>
            setAttributes( { title: value } )
          }
        />

        <div className="ab-accordion-text">
          <InnerBlocks
            allowedBlocks={ ALLOWED_BLOCKS }
          />
        </div>
      </Fragment>
    )
  },

  save({ attributes, className }) {
    return (
      <details open={ attributes.isOpen }>
        <summary class="accordion-item-summary">
          <div class="summary-content">
            <RichText.Content
              value={ attributes.title }
            />
          </div>
        </summary>
        <div class="accordion-item-content">
          <InnerBlocks.Content />
        </div>
      </details>
    )
  },
}
