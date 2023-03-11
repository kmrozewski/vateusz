import React, {useState} from 'react';
import RenameModal from '../modal/RenameModal';
import RemoveModal from '../modal/RemoveModal';
import InvoiceTable from '../table/InvoiceTable';
import TabletAndDesktop from '../../../components/breakpoint/TabletAndDesktop';
import Mobile from '../../../components/breakpoint/Mobile';
import InvoiceCard from '../card/InvoiceCard';
import {IInvoice} from '../../../types/IInvoice';
import {IModal, IRenameModal} from '../../../types/IModal';

interface IProps {
  invoices: IInvoice[];
  fetchInvoices: () => Promise<void>;
}

const InvoiceContainer: React.FC<IProps> = ({invoices, fetchInvoices}) => {
  const [renameModal, setRenameModal] = useState<IRenameModal>({s3Key: '', fileName: '', show: false});
  const [removeModal, setRemoveModal] = useState<IModal>({s3Key: '', show: false});
  const onClose = async <T extends IModal>(modal: T, setModal: (modal: T) => void) => {
    setModal({...modal, show: false});
    await fetchInvoices();
  };

  const getInvoiceCards = () =>
    invoices.map(invoice => (
      <InvoiceCard key={invoice.s3Key} invoice={invoice} showRenameModal={setRenameModal} showRemoveModal={setRemoveModal} />
    ));

  return (
    <>
      <RenameModal {...renameModal} onClose={() => onClose(renameModal, setRenameModal)} />
      <RemoveModal {...removeModal} onClose={() => onClose(removeModal, setRemoveModal)} />
      <TabletAndDesktop>
        <InvoiceTable invoices={invoices} showRenameModal={setRenameModal} showRemoveModal={setRemoveModal} />
      </TabletAndDesktop>
      <Mobile>{getInvoiceCards()}</Mobile>
    </>
  );
};

export default InvoiceContainer;
